import Ember from "ember";
import AjaxPromise from "../utils/ajax-promise";
import config from "../config/environment";

export default Ember.Mixin.create({
  messages: Ember.inject.service(),

  preloadData(includePublicTypes) {
    var promises = [];
    var isDonorApp = this.get("session.isDonorApp");

    var retrieve = types =>
      types.map(type => this.store.findAll(type, { reload: true }));

    if (includePublicTypes && isDonorApp) {
      promises = retrieve(config.APP.PRELOAD_TYPES);
    }

    if (this.get("session.authToken")) {
      promises.push(
        new AjaxPromise(
          "/auth/current_user_profile",
          "GET",
          this.session.get("authToken")
        ).then(data => {
          this.store.pushPayload(data);
          this.store.pushPayload({ user: data.user_profile });
          this.notifyPropertyChange("session.currentUser");
        })
      );

      if (isDonorApp) {
        promises.push(this.store.query("offer", { states: ["for_donor"] }));
        promises = promises.concat(
          retrieve(config.APP.PRELOAD_AUTHORIZED_TYPES)
        );
      }
    }

    return Ember.RSVP.all(promises).then(results => {
      // this.runBackgroundTasks();
      return results;
    });
  },

  runBackgroundTasks() {
    // We don't wait for the following tasks to return
    if (this.session.get("isAdminApp")) {
      this.get("messages").fetchUnreadMessages();
    }
  },

  loadStaticData(includePublicTypes) {
    var promises = [];
    var retrieve = types =>
      types.map(type => this.store.findAll(type, { reload: true }));
    if (includePublicTypes) {
      promises = retrieve(config.APP.PRELOAD_TYPES);
    }
    if (this.get("session.authToken")) {
      promises = promises.concat(retrieve(config.APP.PRELOAD_AUTHORIZED_TYPES));
    }
    return Ember.RSVP.all(promises);
  }
});

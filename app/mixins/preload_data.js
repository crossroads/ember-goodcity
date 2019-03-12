import Ember from "ember";
import AjaxPromise from "../utils/ajax-promise";
import config from "../config/environment";

export default Ember.Mixin.create({
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

      var offer_params = this.session.get("isAdminApp")
        ? { states: ["nondraft"], summarize: true }
        : { states: ["for_donor"] };
      promises.push(this.store.query("offer", offer_params));

      if (isDonorApp) {
        promises = promises.concat(
          retrieve(config.APP.PRELOAD_AUTHORIZED_TYPES)
        );
      }
    }

    return Ember.RSVP.all(promises).then(results => {
      this.runBackgroundTasks();
      return results;
    });
  },

  runBackgroundTasks() {
    // We don't wait for the following tasks to return
    if (this.session.get("isAdminApp")) {
      this.loadUnreadMessages();
    }
  },

  loadUnreadMessages() {
    let batchSize = 20;
    let offerIds = this.store.peekAll("offer").mapBy("id");
    let promises = [];

    while (offerIds.length) {
      let batch = offerIds.splice(0, batchSize);
      promises.push(
        this.store.query("message", {
          state: "unread",
          offer_id: batch.join(",")
        })
      );
    }

    return Ember.RSVP.all(promises);
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

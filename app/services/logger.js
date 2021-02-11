import Ember from "ember";
import config from "../config/environment";

export default Ember.Service.extend({
  session: Ember.inject.service(),
  rollbar: Ember.inject.service(),

  notifyErrorCollector(reason) {
    var currentUser = this.get("session.currentUser");
    var userName = currentUser ? currentUser.get("fullName") : "anonymous";
    var userId = currentUser ? currentUser.get("id") : "n/a";
    var error =
      reason instanceof Error || typeof reason !== "object"
        ? reason
        : JSON.stringify(reason);
    var environment = config.environment;
    var version = config.APP.VERSION;
    var appSHA = config.APP.SHA;
    var appSharedSHA = config.APP.SHARED_SHA;
    if (currentUser) {
      this.set("rollbar.currentUser", currentUser);
    }
    this.get("rollbar").error(error, {
      id: userId,
      username: userName,
      environment: environment,
      version: version,
      appSHA: appSHA,
      appSharedSHA: appSharedSHA
    });
  },

  error(reason) {
    if (reason.status === 0) return;
    console.info(reason);
    this.notifyErrorCollector(reason);
  }
});

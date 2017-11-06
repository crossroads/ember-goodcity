import Ember from "ember";
import config from "../config/environment";
import rollbar from 'rollbar';

export default Ember.Service.extend({
  session: Ember.inject.service(),

  getReason(reason) {
    return reason instanceof Error || typeof reason !== "object" ?
          reason : JSON.stringify(reason);
  },

  notifyRollBar(error, userId, username) {
    rollbar.error(error, { id: userId, username: userName, environment: environment});
  },

  error: function(reason) {
    if (reason.status === 0) {
      return;
    }
    console.info(reason);
    if (config.environment === "production" || config.staging) {
      var userName = this.get("session.currentUser.fullName");
      var userId = this.get("session.currentUser.id");
      var error = this.getReason(reason);
      var environment = config.staging ? "staging" : config.environment;
      var version = `${config.APP.SHA} (shared ${config.APP.SHARED_SHA})`;

      var airbrake = new airbrakeJs.Client({
        projectId: config.APP.AIRBRAKE_PROJECT_ID,
        projectKey: config.APP.AIRBRAKE_PROJECT_KEY
      });
      airbrake.setHost(config.APP.AIRBRAKE_HOST);
      airbrake.notify({ error, context: { userId, userName, environment, version } });
      this.notifyRollBar(error, userId, username, environment);
    }
  }
});

import Ember from "ember";
import config from "../config/environment";
import ActiveModelAdapter from "active-model-adapter";
import _ from "lodash";

export default ActiveModelAdapter.extend({
  namespace: config.APP.NAMESPACE,
  host: config.APP.API_HOST_URL,
  session: Ember.inject.service(),
  i18n: Ember.inject.service(),

  headers: Ember.computed("session.authToken", function() {
    return {
      Authorization: `Bearer ${this.get("session.authToken")}`,
      "Accept-Language": this.get("session.language"),
      "X-GOODCITY-APP-NAME": config.APP.NAME,
      "X-GOODCITY-APP-VERSION": config.APP.VERSION,
      "X-GOODCITY-APP-SHA": config.APP.SHA,
      "X-GOODCITY-APP-SHARED-SHA": config.APP.SHARED_SHA
    };
  }),

  handleResponse(status, headers, responseBody) {
    if (status >= 400) {
      // Errors coming from the adapter do not carry on the message of the server eror
      // The same message ends up apearing on every page whenever the backend returns an error.
      //
      // This returns a normal ember error, with the same format as before, with our own messages inside
      //
      return new DS.AdapterError([
        {
          detail: responseBody,
          status: status,
          title: _.get(
            responseBody,
            "error",
            this.get("i18n").t("unexpected_error")
          )
        }
      ]);
    }

    return this._super(...arguments);
  }
});

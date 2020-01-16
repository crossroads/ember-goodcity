import { notEmpty } from '@ember/object/computed';
import { computed } from '@ember/object';
import Service, { inject as service } from '@ember/service';
import "../computed/local-storage";
import config from "../config/environment";

export default Service.extend({
  authToken: computed.localStorage(),
  otpAuthKey: computed.localStorage(),
  isLoggedIn: notEmpty("authToken"),
  language: computed.localStorage(),
  seenTour: computed.localStorage(),
  store: service(),

  currentUser: computed(function() {
    var store = this.get("store");
    return store.peekAll("user_profile").get("firstObject") || null;
  }).volatile(),

  isAdminApp: computed(function() {
    return config.APP.NAME === "admin.goodcity";
  }),

  loggedInUser: computed(function () {
    return this.get("store").peekRecord("user", this.get("currentUser.id"));
  }),

  isDonorApp: computed("isAdminApp", function() {
    return this.get("isAdminApp") === false;
  }),

  clear: function() {
    this.set("authToken", null);
    this.set("otpAuthKey", null);
  }
});

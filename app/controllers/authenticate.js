import Ember from "ember";
import AjaxPromise from "../utils/ajax-promise";
import config from "../config/environment";
const { getOwner } = Ember;
let timeout;

export default Ember.Controller.extend({
  messageBox: Ember.inject.service(),
  attemptedTransition: null,
  pin: "",
  timer: config.APP.OTP_RESEND_TIME,
  pinAlreadySent: false,

  mobile: Ember.computed("mobilePhone", function() {
    return config.APP.HK_COUNTRY_CODE + this.get("mobilePhone");
  }),

  timerFunction() {
    let waitTime = this.get("timer");
    if (waitTime === 1) {
      this.resetTimerParameters();
      return false;
    }

    if (!this.isDestroyed) {
      // check aaded as workaround to avoid failing test cases because of timer
      this.set("timer", waitTime - 1);
    }

    timeout = setTimeout(() => {
      this.timerFunction();
    }, 1000);
  },

  resetTimerParameters() {
    this.set("pinAlreadySent", false);
    if (!this.isDestroyed) {
      // check aaded as workaround to avoid failing test cases because of timer
      this.set("timer", config.APP.OTP_RESEND_TIME);
    }
  },

  backLinkPath: Ember.computed("session.backLinkPath", function() {
    return this.get("session.backLinkPath") || "login";
  }),

  actions: {
    authenticateUser() {
      Ember.$(".auth_error").hide();
      var pin = this.get("pin");
      var otp_auth_key = this.get("session.otpAuthKey");
      var _this = this;

      var loadingView = getOwner(this)
        .lookup("component:loading")
        .append();
      new AjaxPromise("/auth/verify", "POST", null, {
        pin: pin,
        otp_auth_key: otp_auth_key
      })
        .then(function(data) {
          clearTimeout(timeout);
          _this.resetTimerParameters();
          _this.setProperties({ pin: null });
          _this.set("session.authToken", data.jwt_token);
          _this.set("session.otpAuthKey", null);
          _this.store.pushPayload(data.user);
          _this.transitionToRoute("post_login");
        })
        .catch(function(jqXHR) {
          Ember.$("#pin")
            .closest("div")
            .addClass("error");
          _this.setProperties({ pin: null });
          if (
            jqXHR.status === 422 &&
            jqXHR.responseJSON.errors &&
            jqXHR.responseJSON.errors.pin
          ) {
            _this.get("messageBox").alert(jqXHR.responseJSON.errors.pin);
          }
          console.log("Unable to authenticate");
        })
        .finally(() => loadingView.destroy());
    },

    resendPin() {
      var mobile = this.get("mobile");
      var loadingView = getOwner(this)
        .lookup("component:loading")
        .append();
      var _this = this;

      new AjaxPromise("/auth/send_pin", "POST", null, { mobile: mobile })
        .then(data => {
          this.set("session.otpAuthKey", data.otp_auth_key);
          this.set("session.backLinkPath", "login");
          this.setProperties({ pin: null });
          this.transitionToRoute("/authenticate");
          this.set("pinAlreadySent", true);
          this.timerFunction();
        })
        .catch(error => {
          if ([401].includes(error.status)) {
            _this.get("messageBox").alert("You are not authorized.", () => {
              _this.transitionToRoute("/");
            });
          } else if ([422, 403].includes(error.status)) {
            Ember.$("#mobile")
              .closest(".mobile")
              .addClass("error");
            return;
          }
          throw error;
        })
        .finally(() => loadingView.destroy());
    },

    transitionTo(path) {
      this.transitionToRoute(path);
    }
  }
});

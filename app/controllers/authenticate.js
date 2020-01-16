import $ from 'jquery';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { getOwner } from '@ember/application';
import AjaxPromise from '../utils/ajax-promise';
import config from '../config/environment';

export default Controller.extend({

  messageBox: service(),
  attemptedTransition: null,
  pin: "",

  mobile: computed('mobilePhone', function(){
    return config.APP.HK_COUNTRY_CODE + this.get('mobilePhone');
  }),

  actions: {

    authenticateUser() {
      $('.auth_error').hide();
      var pin = this.get('pin');
      var otp_auth_key = this.get('session.otpAuthKey');
      var _this = this;

      var loadingView = getOwner(this).lookup('component:loading').append();
      new AjaxPromise("/auth/verify", "POST", null, {pin: pin, otp_auth_key: otp_auth_key})
        .then(function(data) {
          _this.setProperties({pin:null});
          _this.set('session.authToken', data.jwt_token);
          _this.set('session.otpAuthKey', null);
          _this.store.pushPayload(data.user);
          _this.setProperties({pin: null});
          _this.transitionToRoute('post_login');
        })
        .catch(function(jqXHR) {
          $('#pin').closest('div').addClass('error');
          _this.setProperties({pin: null});
          if (jqXHR.status === 422 && jqXHR.responseJSON.errors && jqXHR.responseJSON.errors.pin) {
            _this.get("messageBox").alert(jqXHR.responseJSON.errors.pin);
          }
          console.log("Unable to authenticate");
        })
        .finally(() => loadingView.destroy());
    },

    resendPin() {
      var mobile = this.get('mobile');
      var loadingView = getOwner(this).lookup('component:loading').append();
      var _this = this;

      new AjaxPromise("/auth/send_pin", "POST", null, {mobile: mobile})
        .then(data => {
          this.set('session.otpAuthKey', data.otp_auth_key);
          this.setProperties({pin:null});
          this.transitionToRoute('/authenticate');
        })
        .catch(error => {
           if([401].includes(error.status)) {
             _this.get("messageBox").alert("You are not authorized.", () => {
              _this.transitionToRoute("/");
             });
          } else if ([422, 403].includes(error.status)) {
            $('#mobile').closest('.mobile').addClass('error');
            return;
          }
          throw error;
        })
        .finally(() => loadingView.destroy());
    }
  }
});

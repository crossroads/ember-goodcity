import Ember from 'ember';
import AjaxPromise from '../utils/ajax-promise';
import config from '../config/environment';
import preloadDataMixin from '../mixins/preload_data';
const { getOwner } = Ember;

export default Ember.Route.extend(preloadDataMixin, {
  cordova: Ember.inject.service(),
  i18n: Ember.inject.service(),
  isErrPopUpAlreadyShown: false,
  isOfflineErrAlreadyShown: false,
  logger: Ember.inject.service(),
  messageBox: Ember.inject.service(),

  _loadDataStore: function(){
    return this.preloadData(true).catch(error => {
      if (error.status === 0 || (error.errors && error.errors[0].status === "0")) {
        this.transitionTo("offline");
      } else {
        this.handleError(error);
      }
    }).finally(() => {
      // don't know why but placing this before preloadData on iPhone 6 causes register_device request to fail with status 0
      if (this.session.get('isLoggedIn')) {
        this.get("cordova").appLoad();
      }
    });
  },

  init() {
    var _this = this;
    window.localStorage.setItem('authTokenAlreadyRemoved', false);
    var storageHandler = function (object) {
      var authToken = window.localStorage.getItem('authToken');
      if(authToken !== null && authToken.length === 0 && window.localStorage.getItem('authTokenAlreadyRemoved') === "false") {
          window.localStorage.setItem('authTokenAlreadyRemoved', true);
          window.location.reload();
      }
    };
    window.addEventListener("storage", function() {
      storageHandler(_this);
    }, false);
  },

  beforeModel(transition = []) {
    var language;
    try {
      window.localStorage.test = "isSafariPrivateBrowser";
    } catch (e) {
      this.get("messageBox").alert(this.get("i18n").t("QuotaExceededError"));
    }
    window.localStorage.removeItem('test');
    if (transition.queryParams.ln) {
      language = transition.queryParams.ln === "zh-tw" ? "zh-tw" : "en";
      this.set('session.language', language);
    }

    language = this.session.get("language") || "en";
    moment.locale(language);
    this.set("i18n.locale", language);

    Ember.onerror = window.onerror = error => this.handleError(error);
    return this._loadDataStore();
  },

  afterModel() {
    if(this.get("session.isAdminApp")) {
      this.loadStaticData(true).catch(error => {
        if (error.status === 0 || (error.errors && error.errors[0].status === "0")) {
          this.transitionTo("offline");
        } else {
          this.handleError(error);
        }
      });
    }
  },

  renderTemplate() {
    this.render(); // default template

    this.render('notifications', {   // the template to render
      into: 'application',      // the template to render into
      outlet: 'notifications', // the name of the outlet in that template
      controller: 'notifications'   // the controller to use for the template
    });

    if(this.get("session.isAdminApp")){
      this.render('notification_link', {
        into: 'application',
        outlet: 'notification_link',
        controller: 'notification_link'
      });

      this.render('internet_call_status', {
        into: 'application',
        outlet: 'internet_call_status',
        controller: 'internet_call_status'
      });
    }
  },



  offlineError(reason){
    if(!this.get('isOfflineErrAlreadyShown')) {
      this.set('isOfflineErrAlreadyShown', true);
      this.get("messageBox").alert(this.get("i18n").t("offline_error"), () => {
        this.set('isOfflineErrAlreadyShown', false);
      });
      if(!reason.isAdapterError){
        this.get("logger").error(reason);
      }
    }
  },

  quotaExceededError(reason){
    this.get("logger").error(reason);
    this.get("messageBox").alert(this.get("i18n").t("QuotaExceededError"));
  },

  somethingWentWrong(reason) {
    this.get("logger").error(reason);
    if(!this.get('isErrPopUpAlreadyShown')) {
      this.set('isErrPopUpAlreadyShown', true);
      this.get("messageBox").alert(this.get("i18n").t("unexpected_error"), () => {
        this.set('isErrPopUpAlreadyShown', false);
      });
    }
  },

  notFoundError(reason) {
    this.get("logger").error(reason);
    this.get("messageBox").alert(this.get("i18n").t(status+"_error"));
  },

  unauthorizedError() {
    if (this.session.get('isLoggedIn')) {
      this.controllerFor("application").send('logMeOut');
    }
  },

  handleError: function(reason) {
    try
    {
      var status;
      try { status = parseInt(reason.errors[0].status, 10); }
      catch (err) { status = reason.status; }

      if(!window.navigator.onLine){
        this.offlineError(reason);
      } else if(reason.name === "QuotaExceededError") {
        this.quotaExceededError(reason);
      } else if (status === 401) {
        this.unauthorizedError();
      } else if ([403, 404].indexOf(status) >= 0) {
        this.notFoundError(reason);
      } else if (status === 0) {
        // status 0 means request was aborted, this could be due to connection failure
        // but can also mean request was manually cancelled
        this.get("messageBox").alert(this.get("i18n").t("offline_error"));
      } else {
        this.somethingWentWrong(reason);
      }
    } catch (err) {
      console.log(err);
    }
  },

  actions: {
    setLang(language) {
      this.session.set("language", language);
      window.location.reload();
    },
    loading() {
      Ember.$(".loading-indicator").remove();
      var view = getOwner(this).lookup('component:loading').append();
      this.router.one('didTransition', view, 'destroy');
    },
    // this is hopefully only triggered from promises from routes
    // so in this scenario redirect to home for 404
    error(reason) {
      try {
        var errorStatus = parseInt(reason.status || reason.errors && reason.errors[0].status, 10)
        if ([403, 404].indexOf(errorStatus) >= 0) {
          this.get("messageBox").alert(this.get("i18n").t(errorStatus+"_error"), () => this.transitionTo("/"));
        } else {
          this.handleError(reason);
        }
      } catch (err) {
        console.log(err);
      }
    },

    willTransition(transition) {
      Ember.run.next(function() {
        // before transitioning close all foundation-dialog box
        Ember.$(".reveal-modal").foundation("reveal", "close");

        // remove joyride-popup if not assigned for page
        if($(".joyride-list").length === 0) {
          Ember.$('.joyride-tip-guide').remove();
        }
      });
    }
  }
});

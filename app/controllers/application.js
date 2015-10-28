import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  subscriptions: Ember.inject.controller(),

  initSubscriptions: Ember.on('init', function() {
    if (this.session.get("isLoggedIn")) {
      this.send('setSubscriptions');
    }
  }),

  actions: {
    logMeOut() {
      this.session.clear(); // this should be first since it updates isLoggedIn status
      this.get('subscriptions').send('unwire');
      this.store.unloadAll();
      var _this = this;
      config.APP.PRELOAD_TYPES.forEach(function(type) {
        _this.store.findAll(type);
      });
      this.transitionToRoute('login');
    },

    logMeIn() {
      this.send('setSubscriptions');
    },

    setSubscriptions() {
      this.get('subscriptions').send('wire');
    }
  }
});

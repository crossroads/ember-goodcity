import Ember from 'ember';
import preloadDataMixin from '../mixins/preload_data';

export default Ember.Route.extend(preloadDataMixin, {
  cordova: Ember.inject.service(),

  beforeModel() {
    Ember.run(() => this.controllerFor('application').send('logMeIn'));
    return this.preloadData().catch(error => {
      if (error.status === 0) {
        this.transitionTo("offline");
      } else {
        throw error;
      }
    }).finally(() => this.get("cordova").appLoad());
  },

  afterModel() {

    if (this.get("session.isAdminApp")) {
      this.loadStaticData().catch(error => {
        if (error.status === 0) {
          this.transitionTo("offline");
        } else {
          throw error;
        }
      });
    }

    // After everthying has been loaded, redirect user to requested url
    var attemptedTransition = this.controllerFor('login').get('attemptedTransition');
    if (attemptedTransition) {
      attemptedTransition.retry();
      this.set('attemptedTransition', null);
    } else {
      var currentUser = this.get('session.currentUser');
      if (this.get('session.isAdminApp')) {
        this.transitionTo('dashboard');
      } else {
        this.transitionTo('/offers');
      }
    }
  }

});

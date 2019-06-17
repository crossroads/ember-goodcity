import Ember from 'ember';

export default Ember.Route.extend({
  messageBox: Ember.inject.service(),
  i18n: Ember.inject.service(),

  beforeModel(transition) {
    if (!this.session.get('isLoggedIn')) {
      transition.abort();
      var loginController = this.controllerFor('login');
      loginController.set('attemptedTransition', transition);
      this.transitionTo('login');
      return false;
    }
    return true;
  }
});

import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  messageBox: service(),
  i18n: service(),

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

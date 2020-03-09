import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';

export default Route.extend({
  actions: {
    try_again() {
      var currentUrl = getOwner(this).lookup("router:main").get("url");
      if (currentUrl === "/offline") {
        this.transitionTo("/");
      } else {
        window.location.reload();
      }
    }
  }
});

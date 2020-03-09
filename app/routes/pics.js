import Route from '@ember/routing/route';

export default Route.extend({
  renderTemplate() {
    var controllerName = this.get("session.isAdminApp") ? "offers" : "application";

    this.render(); // default template
    this.render('appMenuList', {
      into: 'pics',
      outlet: 'appMenuList',
      controller: controllerName
    });
  }
});

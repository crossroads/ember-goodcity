import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import config from '../../config/environment';

export default Controller.extend({
  i18n: service(),

  info: computed(function(){
    var emailLink = "<a href='mailto:" + config.APP.CONTACT_EMAIL + "'>" + config.APP.CONTACT_EMAIL + "</a>";
    var infoText = this.get("i18n").t("collection_charges.info", {"email":emailLink});
    return "<div>" + infoText.replace(/\n\n/g, "</div><div>") + "</div>";
  })
});

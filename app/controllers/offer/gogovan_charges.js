import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({

  i18n: service(),

  info: computed(function(){
    var chargesInfo = this.get("i18n").t("gogovan_charges.info").string;
    return "<div>" + chargesInfo.replace(/\n\n/g, "</div><div>") + "</div>";
  })

});

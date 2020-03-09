import { inject as service } from '@ember/service';
import TextField from '@ember/component/text-field';

export default TextField.extend({
  tagName: "input",
  type:    "text",
  name:    "userName",
  attributeBindings: [ "name", "type", "id", "value", 'required', 'pattern'],

  i18n: service(),

  didInsertElement(){
    var user = this.attrs.user.value;
    var translatedName = this.get("i18n").t("full_name", { firstName: user.get('firstName'), lastName: user.get('lastName') });
    this.set('value', translatedName);
  }
});


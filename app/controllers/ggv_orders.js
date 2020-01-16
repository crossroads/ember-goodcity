import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import config from './../config/environment';

export default Controller.extend({
  user: alias('model.createdBy'),
  contact: alias('model.delivery.contact'),
  districtName: alias('contact.address.district.name'),

  gmapUrl: computed(function(){
    return config.APP.GMAP_URL;
  }),

  userName: computed('contact.name', 'user', function(){
    return this.get('contact.name') || this.get("user.fullName");
  }),

  userMobile: computed('contact.mobile', 'user', function(){
    var mobile = this.get('contact.mobile') || this.get("user.mobile");
    return mobile ? mobile.split("+852")[1] : "";
  })
});

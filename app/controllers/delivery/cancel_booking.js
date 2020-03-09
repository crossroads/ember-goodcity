import { alias } from '@ember/object/computed';
import Controller, { inject as controller } from '@ember/controller';
import config from './../../config/environment';

export default Controller.extend({

  transportController: controller('offer/transport_details'),

  canCancel: alias('model.gogovanOrder.isCancelled'),
  driverContact: alias('model.gogovanOrder.driverMobile'),
  gogovanContact: config.APP.GOGOVAN_CONTACT,
  isCancel: true,

  actions: {
    cancelBooking() {
      if(this.get('canCancel')){
        this.get('transportController').send('removeDelivery', this.get('model'));
      }
    }
  }
});

import { computed } from '@ember/object';
import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({

  delivery: controller(),
  offer: controller(),

  contact: computed('model', {
    get: function() {
      var deliveryId = this.get('delivery.model.id');
      return this.store.peekRecord('delivery', deliveryId).get("contact");
    },
    set: function(key, value) {
      return value;
    }
  }),

  actions:{
    done() {
      var offerId = this.get('offer.model.id');
      if(this.get("session.isAdminApp")) {
        this.transitionToRoute('review_offer.logistics', offerId);
      } else {
        this.transitionToRoute('offer.transport_details', offerId);
      }
    }
  }
});

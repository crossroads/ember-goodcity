import { computed } from '@ember/object';
import { alias, notEmpty } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';
import { getOwner } from '@ember/application';
import AjaxPromise from '../../utils/ajax-promise';

export default Controller.extend({

  offerController: controller('offer/offer_details'),
  logger: service(),
  offerId: alias('offerController.model.id'),
  gogovanPriceCalculated: notEmpty("gogovanPrice"),
  isDiscountAvailable: false,
  couponDiscount: 0,
  priceWithDiscount: 0,

  offer: computed('offerId', function(){
    return this.store.peekRecord('offer', this.get('offerId'));
  }),

  gogovanPrice: computed('offerId', {
    get: function() {
      var params = {
        districtId: this.get('offer.createdBy.address.district.id'),
        offerId: this.get("offerId")
      };

      new AjaxPromise("/gogovan_orders/calculate_price", "POST", this.session.get('authToken'), params)
        .then(data => {
          var coupon;
          if(data.breakdown) {
            coupon = data.breakdown.coupon_discount;
          }
          this.set("gogovanPrice", data.base);
          if(coupon) {
            this.set("isDiscountAvailable", true);
            this.set("couponDiscount", coupon.value.toString().substring(1));
            this.set('priceWithDiscount', data.total);
          } else {
            this.set("isDiscountAvailable", false);
          }
        }).catch(error => this.get("logger").error(error));

      return "";
    },
    set: function(key, value) {
      return value;
    }
  }),

  actions: {
    startDelivery(delivery_type) {
      var loadingView = getOwner(this).lookup('component:loading').append();
      var offerId = this.get('offerController.model.id');
      var offer = this.store.peekRecord('offer', offerId);
      var delivery = offer.get("delivery");
      if(delivery) {
        delivery.setProperties({ offer: offer });
      } else {
        delivery = this.store.createRecord('delivery', { offer: offer });
      }

      delivery.save()
        .then(delivery => {
          var route;
          switch(delivery_type) {
            case 'Alternate': route = 'delivery.book_timeslot'; break;
            case 'Gogovan':   route = 'delivery.book_van'; break;
            case 'Drop Off':  route = 'delivery.drop_off_schedule'; break;
          }

          this.transitionToRoute(route, delivery, {queryParams: {placeOrder: true}});
        })
        .catch(error => {
          delivery.unloadRecord();
          throw error;
        })
        .finally(() => loadingView.destroy());
    }
  }
});

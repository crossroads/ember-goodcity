import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { getOwner } from '@ember/application';

export default Controller.extend({
  delivery: alias('model.delivery'),
  contact: alias('delivery.contact'),
  hasActiveGGVOrder: alias('delivery.gogovanOrder.isActive'),
  messageBox: service(),
  i18n: service(),
  isDonorApp: alias("session.isDonorApp"),

  user: computed(function(){
    var userId = this.get("model.createdBy.id") || this.session.get("currentUser.id");
    return this.store.peekRecord('user', userId);
  }).volatile(),

  userName: computed('contact.name', 'user.fullName', function(){
    return this.get('contact.name') || this.get("user.fullName");
  }),

  userMobile: computed('contact.mobile', 'user.mobile', function(){
    return this.get('contact.mobile') || this.get("user.mobile");
  }),

  district: computed('contact.address.district.name', 'user.address.district.name', function(){
    return this.get('contact.address.district.name') || this.get("user.address.district.name");
  }),

  actions: {
    handleBrokenImage() {
      this.get("model.reviewedBy").set("hasImage", null);
    },

    cancelDelivery() {
      if(this.get('hasActiveGGVOrder')) {
        // this.set('cancelBooking', true);
        this.transitionToRoute('delivery.cancel_booking', this.get('delivery'))
          .then(newRoute => newRoute.controller.set('isCancel', true));
      } else {
        this.send('removeDelivery', this.get('delivery'));
      }
    },

    modifyBooking() {
      if(this.get('hasActiveGGVOrder')) {
        this.transitionToRoute('delivery.cancel_booking', this.get('delivery'))
          .then(newRoute => newRoute.controller.set('isCancel', false));

      } else {
        this.transitionToRoute('offer.plan_delivery', this.get('delivery.offer'), {queryParams: {modify: true}});
      }
    },

    removeDelivery(delivery) {
      this.get("messageBox").custom(this.get("i18n").t("delete_confirm"), this.get("i18n").t("delivery.cancel.cancel_transport"), () => {
        var loadingView = getOwner(this).lookup('component:loading').append();
        var offer = delivery.get('offer');

        delivery.destroyRecord()
          .then(() => {
            offer.set("state", "reviewed");
            var route = this.get('session.isAdminApp') ? 'review_offer' : 'offer.offer_details';
            this.transitionToRoute(route, offer);
          })
          .finally(() => loadingView.destroy());
      }, this.get("i18n").t("not_now"), null);
    }
  }
});

import VerifyOfferStateRoute from './verify_offer_state';

export default VerifyOfferStateRoute.extend({

  model: function(){
    var ggvOrder = this.store.peekAll('gogovan_order').get('lastObject');
    return ggvOrder.get("districtId") ? ggvOrder : this.store.peekAll('gogovan_order').filterBy('districtId').get("lastObject");
  },

  afterModel: function(order) {
    if(!order) {
      this.transitionTo('delivery.book_van');
    }
  }
});

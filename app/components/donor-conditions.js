import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),

  donorConditions: computed(function(){
    return this.get('store').peekAll('donor_condition');
  }),

  sortedDonorConditions: computed('donorConditions.[]', function(){
    return this.get('donorConditions').sortBy('id');
  })

});

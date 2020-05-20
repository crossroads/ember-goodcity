import Ember from "ember";

export default Ember.Component.extend({
  store: Ember.inject.service(),

  donorConditions: Ember.computed(function() {
    return this.get("store")
      .peekAll("donor_condition")
      .filterBy("visibleToDonor", true);
  }),

  sortedDonorConditions: Ember.computed("donorConditions.[]", function() {
    return this.get("donorConditions").sortBy("id");
  })
});

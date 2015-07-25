import Ember from 'ember';

// Example usage:
//
// DS.Model.extend({
//   donorCondition:       DS.belongsTo('donor_condition'),
//   donorConditionId:     Ember.computed.foreignKey('donorCondition.id'),
// });
//
// This allows you to set `donorConditionId` which will update the `donorCondition`
// property. Binding `donorCondition.id` is not good because if the value changes
// it'll update the `id` property on donorCondition instead of the donorCondition
// on the model.

export default Ember.computed.foreignKey = function(path) {
  var relationshipName = path.split('.')[0];
  return Ember.computed(relationshipName, {
    get(key) {
      return this.get(path);
    },
    set(key, value) {
      var type = this.get(relationshipName + ".constructor.modelName");
      var model = this.store.getById(type, value);
      if (!model) {
        return this.get(path);
      }
      this.set(relationshipName, model);
      return value;
    }
  });
};

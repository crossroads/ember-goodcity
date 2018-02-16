import DS from 'ember-data';

var attr = DS.attr, belongsTo = DS.belongsTo;

export default DS.Model.extend({
  role: belongsTo('role', { async: false }),
  permission: belongsTo('permission', { async: false })
});

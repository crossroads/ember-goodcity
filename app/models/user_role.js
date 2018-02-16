import DS from 'ember-data';

var attr = DS.attr,
  belongsTo = DS.belongsTo;

export default DS.Model.extend({
  user: belongsTo('user', { async: false }),
  role: belongsTo('role', { async: false })
});

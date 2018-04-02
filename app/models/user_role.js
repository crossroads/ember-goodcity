import DS from 'ember-data';

var belongsTo = DS.belongsTo, attr = DS.attr;

export default DS.Model.extend({
  userId: attr('number'),
  roleId: attr('number'),
  user: belongsTo('user', { async: false }),
  role: belongsTo('role', { async: true })
});

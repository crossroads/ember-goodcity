import DS from 'ember-data';

var attr = DS.attr, hasMany = DS.hasMany;

export default DS.Model.extend({
  name: attr('string'),
  users: hasMany('user', { async: false }),
  permissions: hasMany('permission', { async: false })
});

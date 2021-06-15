import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr("string"),
  rolePermissions: DS.hasMany("rolePermissions", { async: false }),
  users: DS.hasMany("users", { async: false }),
});

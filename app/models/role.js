import Model, { attr, hasMany } from "@ember-data/model";

export default Model.extend({
  name: attr("string"),
  rolePermissions: hasMany("rolePermissions", { async: false }),
  users: hasMany("users", { async: false }),
});

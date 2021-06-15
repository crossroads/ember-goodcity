import DS from "ember-data";

export default DS.Model.extend({
  role: DS.belongsTo("role", { async: false }),
  permission: DS.belongsTo("permission", { async: false }),
});

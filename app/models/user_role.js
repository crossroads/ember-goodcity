import DS from "ember-data";

export default DS.Model.extend({
  userId: DS.attr("number"),
  roleId: DS.attr("number"),
  user: DS.belongsTo("user", { async: false }),
  role: DS.belongsTo("role", { async: true }),
});

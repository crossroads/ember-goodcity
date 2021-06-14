import Model, { belongsTo, attr } from "@ember-data/model";

export default Model.extend({
  userId: attr("number"),
  roleId: attr("number"),
  user: belongsTo("user", { async: false }),
  role: belongsTo("role", { async: true }),
});

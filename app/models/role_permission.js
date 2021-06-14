import Model, { belongsTo } from "@ember-data/model";

export default Model.extend({
  role: belongsTo("role", { async: false }),
  permission: belongsTo("permission", { async: false }),
});

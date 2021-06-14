import Model, { attr, hasMany } from "@ember-data/model";

export default Model.extend({
  name: attr("string"),
  code: attr("string"),
  isItemTypeNode: attr("boolean", { defaultValue: false }),

  items: hasMany("item", { async: false }),
  packages: hasMany("package", { async: false }),
});

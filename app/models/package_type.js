import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr("string"),
  code: DS.attr("string"),
  isItemTypeNode: DS.attr("boolean", { defaultValue: false }),

  items: DS.hasMany("item", { async: false }),
  packages: DS.hasMany("package", { async: false }),
});

import DS from "ember-data";

var attr = DS.attr,
  hasMany = DS.hasMany;

export default DS.Model.extend({
  name: attr("string"),
  visibleToDonor: attr("boolean"),
  items: hasMany("item", { async: false })
});

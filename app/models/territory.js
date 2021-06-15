import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr("string"),
  districts: DS.hasMany("district", { async: false }),
});

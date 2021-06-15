import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr("string"),
  holiday: DS.attr("date"),
  year: DS.attr("number"),
});

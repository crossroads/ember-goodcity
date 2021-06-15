import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr("string"),
  crmId: DS.attr("number"),
  createdById: DS.attr("number"),
  updatedById: DS.attr("number"),

  offers: DS.hasMany("offers", {
    async: false,
  }),
});

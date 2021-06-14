import Model, { hasMany, attr } from "@ember-data/model";

export default Model.extend({
  name: attr("string"),
  crmId: attr("number"),
  createdById: attr("number"),
  updatedById: attr("number"),

  offers: hasMany("offers", {
    async: false,
  }),
});

import Model, { attr, hasMany } from "@ember-data/model";

export default Model.extend({
  name: attr("string"),
  items: hasMany("item", { async: false }),
});

import Model, { attr, belongsTo } from "@ember-data/model";

export default Model.extend({
  name: attr("string"),
  territory: belongsTo("territory", { async: false }),
});

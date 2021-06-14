import Model, { attr, hasMany } from "@ember-data/model";
import { computed } from "@ember/object";

export default Model.extend({
  name: attr("string"),
  items: hasMany("item", { async: false }),

  specialId: computed("id", function () {
    return this.get("id") + "_reason";
  }),
});

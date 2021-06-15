import DS from "ember-data";
import { computed } from "@ember/object";

export default DS.Model.extend({
  name: DS.attr("string"),
  items: DS.hasMany("item", { async: false }),

  specialId: computed("id", function () {
    return this.get("id") + "_reason";
  }),
});

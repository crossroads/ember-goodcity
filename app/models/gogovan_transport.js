import DS from "ember-data";
import { computed } from "@ember/object";

export default DS.Model.extend({
  name: DS.attr("string"),
  disabled: DS.attr("boolean"),

  specialId: computed("id", function () {
    return this.get("id") + "_ggv";
  }),
});

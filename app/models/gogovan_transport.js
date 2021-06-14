import Model, { attr } from "@ember-data/model";
import { computed } from "@ember/object";

export default Model.extend({
  name: attr("string"),
  disabled: attr("boolean"),

  specialId: computed("id", function () {
    return this.get("id") + "_ggv";
  }),
});

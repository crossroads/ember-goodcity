import Model, { attr, belongsTo } from "@ember-data/model";
import { computed } from "@ember/object";
import { equal, notEmpty, and } from "@ember/object/computed";

export default Model.extend({
  start: attr("date"),
  finish: attr("date"),
  deliveryType: attr("string"),

  offer: belongsTo("offer", { async: false }),
  contact: belongsTo("contact", { async: false }),
  schedule: belongsTo("schedule", { async: false }),
  gogovanOrder: belongsTo("gogovan_order", { async: false }),

  isGogovan: equal("deliveryType", "Gogovan"),
  isDropOff: equal("deliveryType", "Drop Off"),
  isAlternate: equal("deliveryType", "Alternate"),
  wasDropOff: notEmpty("schedule.slot"),
  hasGGVorder: and("isGogovan", "gogovanOrder"),

  noDropOff: computed("deliveryType", function () {
    return this.get("deliveryType") !== "Drop Off";
  }),

  noGogovan: computed("deliveryType", function () {
    return this.get("deliveryType") !== "Gogovan";
  }),

  completedWithGogovan: computed(
    "gogovanOrder",
    "gogovanOrder.status",
    function () {
      return this.get("isGogovan") && this.get("gogovanOrder.isCompleted");
    }
  ),
});

import DS from "ember-data";
import { computed } from "@ember/object";
import { equal, notEmpty, and } from "@ember/object/computed";

export default DS.Model.extend({
  start: DS.attr("date"),
  finish: DS.attr("date"),
  deliveryType: DS.attr("string"),

  offer: DS.belongsTo("offer", { async: false }),
  contact: DS.belongsTo("contact", { async: false }),
  schedule: DS.belongsTo("schedule", { async: false }),
  gogovanOrder: DS.belongsTo("gogovan_order", { async: false }),

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

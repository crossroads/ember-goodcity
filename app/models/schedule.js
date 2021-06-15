import DS from "ember-data";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default DS.Model.extend({
  resource: DS.attr("string"),
  slot: DS.attr("number"),
  slotName: DS.attr("string"),
  zone: DS.attr("string"),
  scheduledAt: DS.attr("date"),

  deliveries: DS.hasMany("delivery", { async: false }),

  i18n: service(),

  dayTime: computed("slotName", function () {
    var slot = (this.get("slotName") || "").match(/\d+/);
    var day_time = "";
    if (slot) {
      slot = parseInt(slot, 10);
      day_time = this.get("i18n").t(
        "day." + (slot > 8 && slot < 12 ? "morning" : "afternoon")
      );
    }
    return day_time;
  }),
});

import DS from "ember-data";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";

export default DS.Model.extend({
  event: DS.attr("string"),
  itemType: DS.attr("string"),
  itemId: DS.attr("number"),
  whodunnit: DS.attr("string"),
  whodunnitName: DS.attr("string"),
  state: DS.attr("string"),
  createdAt: DS.attr("date"),

  createdDate: computed(function () {
    return this.get("createdAt").toDateString();
  }),

  i18n: service(),

  displayMessage: computed(function () {
    switch (this.get("state")) {
      case "draft":
        return this.get("i18n").t("item_log.added", {
          name: this.get("whodunnitName"),
        });
      case "submitted":
        return this.get("i18n").t("item_log.submitted", {
          name: this.get("whodunnitName"),
        });
      case "accepted":
        return this.get("i18n").t("item_log.accepted", {
          name: this.get("whodunnitName"),
        });
      case "rejected":
        return this.get("i18n").t("item_log.rejected", {
          name: this.get("whodunnitName"),
        });
      case "received":
        return this.get("i18n").t("item_log.received", {
          name: this.get("whodunnitName"),
        });
      case "missing":
        return this.get("i18n").t("item_log.missing", {
          name: this.get("whodunnitName"),
        });
    }

    switch (this.get("event")) {
      case "admin_called":
      case "donor_called":
        return this.get("i18n").t("offer_log.donor_called", {
          name: this.get("whodunnitName"),
        });
      case "call_accepted":
        return this.get("i18n").t("offer_log.call_accepted", {
          name: this.get("whodunnitName"),
        });
    }

    return this.get("i18n").t("item_log.updated", {
      name: this.get("whodunnitName"),
    });
  }),
});

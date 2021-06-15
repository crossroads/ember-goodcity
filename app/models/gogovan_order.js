import DS from "ember-data";
import { computed } from "@ember/object";
import { equal, or } from "@ember/object/computed";
import { inject as service } from "@ember/service";

export default DS.Model.extend({
  name: DS.attr("string"),
  mobile: DS.attr("string"),

  bookingId: DS.attr("number"),
  status: DS.attr("string"),
  pickupTime: DS.attr("date"),
  slot: DS.attr("string"),
  districtId: DS.attr("number"),
  territoryId: DS.attr("number"),
  offerId: DS.attr("number"),
  gogovanOptionId: DS.attr("number"),
  completedAt: DS.attr("date"),

  needEnglish: DS.attr("boolean"),
  needCart: DS.attr("boolean"),
  needCarry: DS.attr("boolean"),
  needOver6ft: DS.attr("boolean"),
  removeNet: DS.attr("string"),

  baseFee: DS.attr("string"),
  totalFee: DS.attr("string"),
  needEnglishFee: DS.attr("string"),
  needCartFee: DS.attr("string"),
  removeNetFee: DS.attr("string"),

  price: DS.attr("number"),
  driverName: DS.attr("string"),
  driverMobile: DS.attr("string"),
  driverLicense: DS.attr("string"),
  ggvUuid: DS.attr("string"),
  delivery: DS.belongsTo("delivery", { async: false }),
  isDiscountAvailable: false,
  couponDiscount: 0,

  i18n: service(),

  isPending: equal("status", "pending"),
  isActive: equal("status", "active"),
  isCompleted: equal("status", "completed"),
  isCancelled: equal("status", "cancelled"),
  isPickedUp: or("isActive", "isCompleted"),
  nonCompleted: or("isActive", "isPending"),

  ggvOrderStatus: computed("isActive", "isCompleted", function () {
    if (this.get("isActive")) {
      return this.get("i18n").t("offer.offer_details.is_gogovan_confirm")
        .string;
    } else if (this.get("isCompleted")) {
      return this.get("i18n").t("offer.offer_details.driver_completed").string;
    } else {
      return this.get("i18n").t("offer.offer_details.is_gogovan_order").string;
    }
  }),
});

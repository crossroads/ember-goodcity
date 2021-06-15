import DS from "ember-data";
import { isBlank } from "@ember/utils";
import { computed } from "@ember/object";
import Ember from "ember";

export default DS.Model.extend({
  flat: DS.attr("string"),
  building: DS.attr("string"),
  street: DS.attr("string"),
  addressType: DS.attr("string"),

  district: DS.belongsTo("district", { async: false }),

  addressableType: DS.attr("string"),
  addressable: DS.belongsTo("addressable", { polymorphic: true, async: false }),

  fullAddress: computed("flat", "building", "street", function () {
    var addressDetails = [
      this.get("flat"),
      this.get("building"),
      this.get("street"),
    ];
    addressDetails = isBlank(addressDetails.compact())
      ? [this.get("district.name"), this.get("district.territory.name")]
      : addressDetails;
    var formattedAddress = addressDetails.join("<br>");
    return new Ember.Handlebars.SafeString(formattedAddress);
  }),

  regionDetails: computed("flat", "building", "street", function () {
    return [this.get("flat"), this.get("building"), this.get("street")]
      .compact()
      .join(" ");
  }),
});

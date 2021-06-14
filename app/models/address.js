import Model, { attr, belongsTo } from "@ember-data/model";
import { isBlank } from "@ember/utils";
import { computed } from "@ember/object";
import Ember from "ember";

export default Model.extend({
  flat: attr("string"),
  building: attr("string"),
  street: attr("string"),
  addressType: attr("string"),

  district: belongsTo("district", { async: false }),

  addressableType: attr("string"),
  addressable: belongsTo("addressable", { polymorphic: true, async: false }),

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

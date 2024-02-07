import Ember from "ember";
import DS from "ember-data";
import config from "../config/environment";

var attr = DS.attr,
  belongsTo = DS.belongsTo;

export default DS.Model.extend({
  cloudinaryUtils: Ember.inject.service(),

  imageableType: attr("string"),
  imageableId: attr("number"),
  favourite: attr("boolean"),
  cloudinaryId: attr("string"),
  item: belongsTo("item", { async: false }),
  angle: attr("number"),
  itemId: attr("number"),
  packageId: attr("number"),

  imageUrl: Ember.computed("cloudinaryId", "angle", function() {
    return this.get("cloudinaryUtils").generateUrl(this.get("cloudinaryId"), {
      angle: this.get("angle") || 0
    });
  }),

  thumbImageUrl: Ember.computed("cloudinaryId", "angle", function() {
    return this.get("cloudinaryUtils").generateThumbnailUrl(
      this.get("cloudinaryId"),
      {
        angle: this.get("angle") || 0
      }
    );
  }),

  isImageOnLongTermStorage: Ember.computed("cloudinaryId", function() {
    return (
      (this.get("cloudinaryId") || "").indexOf(
        config.APP.LONG_TERM_IMAGE_STORAGE_ID_PREFIX
      ) === 0
    );
  })
});

import Model, { attr, belongsTo } from "@ember-data/model";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default Model.extend({
  cloudinaryUtils: service(),

  imageableType: attr("string"),
  imageableId: attr("number"),
  favourite: attr("boolean"),
  cloudinaryId: attr("string"),
  item: belongsTo("item", { async: false }),
  angle: attr("number"),
  itemId: attr("number"),
  packageId: attr("number"),

  imageUrl: computed("cloudinaryId", "angle", function () {
    return this.get("cloudinaryUtils").generateUrl(this.get("cloudinaryId"), {
      angle: this.get("angle") || 0,
    });
  }),

  thumbImageUrl: computed("cloudinaryId", "angle", function () {
    return this.get("cloudinaryUtils").generateThumbnailUrl(
      this.get("cloudinaryId"),
      {
        angle: this.get("angle") || 0,
      }
    );
  }),
});

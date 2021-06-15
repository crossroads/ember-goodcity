import DS from "ember-data";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default DS.Model.extend({
  cloudinaryUtils: service(),

  imageableType: DS.attr("string"),
  imageableId: DS.attr("number"),
  favourite: DS.attr("boolean"),
  cloudinaryId: DS.attr("string"),
  item: DS.belongsTo("item", { async: false }),
  angle: DS.attr("number"),
  itemId: DS.attr("number"),
  packageId: DS.attr("number"),

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

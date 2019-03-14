import Ember from "ember";

export default Ember.Service.extend({
  generateThumbnailUrl(id, opts) {
    return this.generateUrl(id, {
      ...opts,
      width: 120,
      height: 120,
      crop: true
    });
  },

  generateUrl(id, opts = {}) {
    const { angle = 0, crop = false, width, height } = opts;

    if (!id || id.indexOf("/") === -1) {
      return null;
    }

    var version = id.split("/")[0];
    var filename = id.substring(id.indexOf("/") + 1);
    var options = {
      version: version,
      height: height,
      width: width,
      crop: crop === true ? "fill" : "fit",
      flags: "progressive",
      id: id,
      secure: true,
      protocol: "https:"
    };
    if (angle) {
      options["angle"] = angle;
    }
    return Ember.$.cloudinary.url(filename, options);
  }
});

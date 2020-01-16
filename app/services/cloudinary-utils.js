import $ from 'jquery';
import Service from '@ember/service';

export default Service.extend({
  generateThumbnailUrl(id, opts) {
    const new_obj = Object.assign({}, {opts}, {width: 120,
      height: 120,
      crop: true});
    return this.generateUrl(id, new_obj);
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
    return $.cloudinary.url(filename, options);
  }
});

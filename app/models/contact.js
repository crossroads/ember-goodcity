import { attr, belongsTo } from "@ember-data/model";
import Addressable from "./addressable";

export default Addressable.extend({
  name: attr("string"),
  mobile: attr("string"),

  delivery: belongsTo("delivery", { async: false }),
});

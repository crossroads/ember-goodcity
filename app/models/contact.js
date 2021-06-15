import { attr, belongsTo } from "@ember-data/model";
import Addressable from "./addressable";

export default Addressable.extend({
  name: DS.attr("string"),
  mobile: DS.attr("string"),

  delivery: DS.belongsTo("delivery", { async: false }),
});

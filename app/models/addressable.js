import Model, { belongsTo } from "@ember-data/model";

var Addressable = Model.extend({
  address: belongsTo("address", { async: false }),
});

export default Addressable;

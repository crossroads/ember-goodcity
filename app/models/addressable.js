import DS from "ember-data";

var Addressable = DS.Model.extend({
  address: DS.belongsTo("address", { async: false }),
});

export default Addressable;

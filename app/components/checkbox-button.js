import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "input",
  type: "checkbox",
  collected: [2,5,7],
  attributeBindings: [ "name", "type", "value", "checked", "labelText", "disabled", "collected" ],
  disabled: false,

  click() {
    // this.set("collected")
    this.get("collected").pushObject(this.$().val());
  },

  checked: Ember.computed('selection', function(){

    // This block added for setting selection of reject item options.
    if(Ember.$.trim(this.labelText).length > '0' && this.get('selection.isController')){
      this.set("selection", '-1');
    }

    return this.get("collected").indexOf(parseInt(this.get("value"))) >= 0
  }),

  onInit: Ember.on('init', function() {
    if (this.get("collected").indexOf(this.get("value")) >= 0) {
      this.set("checked", true);
    }
  })
});

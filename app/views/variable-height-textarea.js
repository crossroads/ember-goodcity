import Ember from 'ember';

export default Ember.TextArea.extend({
  tagName: "textarea",
  type: "text",
  attributeBindings: [ "name", "type", "value", "disabled", "required",
    "parentDiv" ],
  disabled: false,

  valueChanged: function(){
    var textarea = this.element;
    if(textarea) {
      // auto-resize height of textarea
      Ember.$(textarea)
        .css({'height':'auto','overflow-y':'hidden'})
        .height(textarea.scrollHeight - 15);

      if(this.get('parentDiv')) {
        // auto-move textarea by chaning margin of parentDiv
        Ember.$(textarea)
          .closest('.'+ this.get('parentDiv'))
          .css({'margin-bottom': textarea.scrollHeight - 50 });

        // scrolling down to bottom of page
        Ember.$('html, body').stop(true, false).animate({
          scrollTop: Ember.$(document).height()
        }, 'fast');
      }
    }
  }.observes('value'),

});

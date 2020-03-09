import $ from 'jquery';
import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    this._super();

    scheduleOnce('afterRender', this, function(){
      validateInputs();
      validateForm();
    });

    function validateForm(){
      $('.book_van').click(function(){
        $.each(['.pickadate', '.timepicker'], function(i, input){
          checkInput($(input));
        });
        if($('.has-error').length > 0) { return false; }
      });
    }

    function validateInputs(){
      $('.pickadate, .timepicker').focusout(function(){
        return checkInput(this);
      });
      $('.pickadate, .timepicker').focus(function(){
        return removeHighlight(this);
      });
    }

    function checkInput(element){
      var parent = $(element).parent();
      var value = $(element).val();

      if(value === undefined || value.length === 0) {
        parent.addClass('has-error');
      } else {
        parent.removeClass('has-error');
      }
    }

    function removeHighlight(element){
      var parent = $(element).parent();
      parent.removeClass('has-error');
    }
  }
});

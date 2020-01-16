import $ from 'jquery';
import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';

export default Component.extend({

  didInsertElement() {
    scheduleOnce('afterRender', this, function(){
      $('html, body').scrollTop(0);
    });
  }

});

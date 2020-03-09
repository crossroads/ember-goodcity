import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';

// Scroll to bottom of start page to display language-switcher
export default Component.extend({
  didInsertElement() {
    this._super();

    scheduleOnce('afterRender', this, function(){
      if(window.location.pathname === '/'){
        window.scrollTo(0, document.body.scrollHeight);
      }
    });
  }

});

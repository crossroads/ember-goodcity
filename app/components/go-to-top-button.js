import $ from 'jquery';
import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';

export default Component.extend({

  didInsertElement() {
    this._super();

    scheduleOnce('afterRender', this, function(){
      var offset = 300;
      var duration = 300;

      $('.sticky_title_bar').on('click', '.back', function(){
        window.scrollTo(0, 0);
      });

      $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
          $('.back-to-top').fadeIn(duration);
        } else {
          $('.back-to-top').fadeOut(duration);
        }
      });

      $('.back-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, duration);
        return false;
      });
    });
  }
});

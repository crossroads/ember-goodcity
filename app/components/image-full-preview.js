import $ from 'jquery';
import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';

export default Component.extend({

  lightGallery: null,

  didInsertElement(){
    var _this = this;

    this._super();

    scheduleOnce('afterRender', this, function(){
      var lightGallery = $("#imageGallery").lightGallery({
        thumbnail: false,
        hideControlOnEnd: true,
        closable: false,
        counter: true,
        swipeThreshold : 50,
        enableTouch : true,
        selector: '.preview_image'
      });

      _this.set("lightGallery", lightGallery);

    });
  },

  willDestroyElement() {
    this.get("lightGallery").destroy();
  }

});

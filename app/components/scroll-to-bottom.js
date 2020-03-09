import $ from 'jquery';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
export default Component.extend({

  cordova: service(),

  didInsertElement() {
    var _this = this;
    this._super();

    scheduleOnce('afterRender', this, function(){

      // Scroll back to page-top on back-click
      $('.sticky_title_bar').on('click', '.back', function(){
        window.scrollTo(0, 0);
      });

      // Stick Notification bell icon in header
      if($('.sticky_title_bar').length > 0) {
        $('.all_unread_messages_count').addClass("fixed_to_header");
      }

      // Fixed header in iOS
      if(_this.get("cordova").isIOS()) {
        $("textarea").on("touchstart", function(){
          $(".sticky_title_bar").css({"position": "absolute"});
        });

        $("textarea").on("blur", function(){
          $(".sticky_title_bar").css({"position": "fixed"});
        });
      }

    });

    scheduleOnce("afterRender", this, function() {

      var messageBox, id, scrollOffset;
      var hadUnread = $(".hidden.unread_id") && $(".hidden.unread_id").attr("data-name");

      // Scroll to first unread message in thread
      if($(".unread.received_message:first").length > 0) {
        id = $(".unread.received_message:first").attr("id");
        messageBox = $(`#${id}`);
        scrollOffset = messageBox.offset().top - 100;
      } else {

        // scroll to bottom
        if($(".message-textbar").length > 0) {
          scrollOffset = $(document).height();
        }
      }

      var screenHeight = document.documentElement.clientHeight;
      var pageHeight = document.documentElement.scrollHeight;

      if(scrollOffset && !hadUnread && pageHeight > screenHeight) {
        window.scrollTo(0, scrollOffset);
      }

      $(".hidden.unread_id").attr("data-name", (id || 0));
      return true;
    });
  },

  willDestroyElement(){
    $('.all_unread_messages_count').removeClass("fixed_to_header");
  }
});

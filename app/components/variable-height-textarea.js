import $ from "jquery";
import { once, scheduleOnce } from "@ember/runloop";
import { observer } from "@ember/object";
import { inject as service } from "@ember/service";
import TextArea from "@ember/component/text-area";
import config from "./../config/environment";

export default TextArea.extend({
  tagName: "textarea",
  attributeBindings: ["disabled"],
  disabled: false,
  cordova: service(),

  valueChanged: observer("value", function () {
    var _this = this;
    var textarea = _this.element;

    if (textarea) {
      once(function () {
        // auto-resize height of textarea $('textarea')[0].
        if (textarea.scrollHeight < 120) {
          $(textarea)
            .css({ height: "auto", "overflow-y": "hidden" })
            .height(textarea.scrollHeight - 15);

          var parent = _this.get("parentDiv");
          var grandParentDiv = $(`.${parent}`).closest(".review_item ");
          if (grandParentDiv.length === 0) {
            // auto-move textarea by chaning margin of parentDiv
            var paddingSize = config.cordova.enabled
              ? 5
              : textarea.scrollHeight - 40;
            $(`.${parent}`).css({
              "padding-bottom": paddingSize > 0 ? paddingSize : 0,
            });

            // scrolling down to bottom of page
            if (_this.get("value") !== "") {
              window.scrollTo(0, document.body.scrollHeight);
            }
          }
        } else {
          $(textarea).css({ height: "auto", "overflow-y": "auto" }).height(105);
        }
      });
    }
  }),

  didInsertElement() {
    var _this = this;
    var parent = _this.get("parentDiv");
    var grandParentDiv = $(`.${parent}`).closest(".review_item ");

    // Apply only in Donor Cordova App.
    if (grandParentDiv.length === 0 && config.cordova.enabled) {
      var msgTextbox = $($(_this.element).closest(".message-textbar"));

      scheduleOnce("afterRender", this, function () {
        var isIOS = _this.get("cordova").isIOS();

        var height = isIOS ? 55 : 30;
        $(".message-footer").height(height);

        $(_this.element).focus(function () {
          if (isIOS) {
            if (document.body.scrollHeight === $(window).height()) {
              $(".message-footer").addClass("message_footer_small_page");
            } else {
              $(".message-footer").removeClass("message_footer_small_page");
            }
            msgTextbox.css({ position: "relative" });
          }

          window.scrollTo(0, document.body.scrollHeight);
        });

        $(_this.element).blur(function () {
          msgTextbox.css({ position: "fixed" });
        });
      });
    }
  },
});

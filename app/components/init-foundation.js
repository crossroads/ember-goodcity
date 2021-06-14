import $ from "jquery";
import { later, debounce, scheduleOnce } from "@ember/runloop";
import { computed } from "@ember/object";
import Component from "@ember/component";
import config from "../config/environment";

export default Component.extend({
  foundation: null,

  currentClassName: computed("className", function () {
    return this.get("className") ? `.${this.get("className")}` : document;
  }),

  click() {
    later(function () {
      if ($(".off-canvas-wrap.move-right")[0]) {
        if (config.cordova.enabled) {
          $("body").css({ position: "fixed", width: "100%" });
        } else {
          $("body").css("overflow", "hidden");
        }
      } else {
        if (config.cordova.enabled) {
          $("body").css({ position: "inherit", width: "inherit" });
        } else {
          $("body").css("overflow", "auto");
        }
      }
    }, 100);
  },

  didInsertElement() {
    var className = this.get("currentClassName");
    var _this = this;

    this._super();

    debounce(
      this,
      function () {
        var clientHeight = $(window).height();
        $(".inner-wrap").css("min-height", clientHeight);
      },
      1000
    );

    scheduleOnce("afterRender", this, function () {
      var initFoundation = $(className).foundation({
        offcanvas: { close_on_click: true },
      });
      _this.set("foundation", initFoundation);
    });
  },

  // TODO: Breaks sometime on menu-bar
  // willDestroyElement() {
  //   this.get("foundation").foundation("destroy");
  // }
});

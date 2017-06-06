import Ember from 'ember';
import loading from '../templates/loading';

export default Ember.Component.extend({
  layout: loading,
  classNames: ["loading-indicator"],
  messageBox: Ember.inject.service(),
  logger: Ember.inject.service(),
  i18n: Ember.inject.service(),
  timer: null,
  prompt: null,

  didInsertElement() {
    var timer = Ember.run.later(() => {
      this.get("logger").error(new Error(this.get("i18n").t("loading_timeout_error")));

      var cancelCallback = () => {
        this.destroy();
        window.location.reload();
      };

      var continueCallback = () => {
        if (!this.get("isDestroyed")) {
          Ember.$(document).off("cancel-loading-timer");
          this.didInsertElement.call(this);
        }
      };

      var view = this.get("messageBox").custom(
        this.get("i18n").t("loading_timeout"),
        this.get("i18n").t("cancel"),
        continueCallback,
        this.get("i18n").t("okay"),
        cancelCallback,
        false
      );

      if(view) {
        // we already have a black overlay from loading screen, so prevent this one making it darker
        view.on("didInsertElement", function() {
          view.$(".reveal-modal-bg").css("background-color", "transparent");
        });

        this.set("prompt", view);
      }
    }, 30000);

    this.set("timer", timer);
  },

  willDestroyElement() {
    Ember.run.cancel(this.get("timer"));
    var view = this.get("prompt");
    if (view) {
      this.get("prompt").destroy();
    }
  }
});

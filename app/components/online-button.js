import { bind } from "@ember/runloop";
import Component from "@ember/component";
import Ember from "ember";

/* {{#"online-button" classNames="btn" action="submit" actionArgs=true}}
 *   {{t "btn_label"}}
 * {{/online-button}}
 *
 * You can pass multiple arguments for actionArgs like this: actionArgs="[\"test\",true]"
 * Note actionArgs="['test']" causes json parse error, but this works actionArgs='["test"]'
 */

export default Component.extend(Ember.TargetActionSupport, {
  attributeBindings: ["disabled"],
  disabled: false,
  offer: null,

  updateDisabled: null,
  disabledOverride: false,

  didInsertElement: function () {
    this.updateDisabled = bind(this, () => {
      var online = window.navigator.connection
        ? window.navigator.connection.type !== "none"
        : window.navigator.onLine;
      this.set("disabled", !online || this.get("disabledOverride"));
    });
    this.updateDisabled();
    if (this.get("offer")) {
      if (this.get("offer.state") === "received") {
        this.set("disabled", true);
      } else {
        this.set("disabled", false);
      }
    }
    window.addEventListener("online", this.updateDisabled);
    window.addEventListener("offline", this.updateDisabled);
  },

  willDestroyElement: function () {
    if (this.updateDisabled) {
      window.removeEventListener("online", this.updateDisabled);
      window.removeEventListener("offline", this.updateDisabled);
    }
  },

  click: function () {
    var args = this.get("actionArgs");
    if (typeof args === "string" && args.indexOf("[") === 0) {
      args = JSON.parse(args);
    }
    this.triggerAction({ actionContext: args });
  },
});

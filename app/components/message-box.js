import { inject as service } from '@ember/service';
import Component from '@ember/component';
import messageBox from '../templates/components/message-box';

export default Component.extend({

  layout: messageBox,
  message: "",
  btn1Text: "",
  btn1Callback: () => {},
  btn2Text: "",
  btn2Callback: () => {},
  displayCloseLink: false,
  router: service('-routing'),

  isVisible: false,

  close() {
    if (this.get("isVisible")) {
      this.set("isVisible", false);
    } else {
      this.destroy();
    }
  },

  init() {
    this._super(...arguments);
    this.router.addObserver('currentRouteName', () => this.close() );
  },

  actions: {
    btn1Click() {
      var callbackOutput = true;
      if (this.btn1Callback) {
        callbackOutput = this.btn1Callback();
      }
      if(callbackOutput !== false) { this.close(); }
    },

    btn2Click() {
      if (this.btn2Callback) {
        this.btn2Callback();
      }
      this.close();
    },

    closeModal() {
      this.close();
    }
  }
});

import { inject as service } from '@ember/service';
import Component from '@ember/component';
import config from '../config/environment';

export default Component.extend({
  tagName: "a",
  href: "#",
  cordova: service(),

  click() {
    if (config.cordova.enabled) {
      cordova.InAppBrowser.open(this.decodeLink(), "_system");
    } else {
      window.open(this.decodeLink(), "_system");
    }
    return false;
  },

  decodeLink: function(){
    var link = this.attrs.linkUrl.value || this.attrs.linkUrl;
    return link.replace(/&amp;/g, '&');
  }
});

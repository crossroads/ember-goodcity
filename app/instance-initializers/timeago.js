import $ from 'jquery';
import { later } from '@ember/runloop';
import config from '../config/environment';

export default {
  name: 'timeago',

  initialize: function(app) {
    var i18n = app.lookup("service:i18n");
    var loc = str => i18n.t("time_ago." + str).string;

    moment.locale('en', {
      relativeTime : {
        future: "",
        past:   "",
        s:  loc("1m"),
        m:  loc("1m"),
        mm: "%d" + loc("m"),
        h:  "%d" + loc("h"),
        hh: "%d" + loc("h"),
        d:  "%d" + loc("d"),
        dd: "%d" + loc("d"),
        M:  "%d" + loc("mth"),
        MM: "%d" + loc("mths"),
        y:  "%d" + loc("y"),
        yy: "%d" + loc("y")
      }
    });

    if (config.environment !== "test") {
      later(this, this.updateTime, 60000);
    }
  },

  updateTime: function() {
    $(".timeago").each((idx, elm) =>
      elm.innerText = moment(elm.getAttribute("datetime")).fromNow(true));
    later(this, this.updateTime, 60000);
  }
};

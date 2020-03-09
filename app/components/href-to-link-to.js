// Manually added anchor tags causes whole app to reload.
// This component will treat anchor tag as link-to links.
// Ex: <a href="/offers/1/plan_delivery"></a> will be trated as route "offers.plan_delivery"

import { isNone } from '@ember/utils';

import $ from 'jquery';
import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';
import { getOwner } from '@ember/application';

export default Component.extend({

  _getNormalisedRootUrl: function(router) {
    var rootURL = router.rootURL;
    if(rootURL.charAt(rootURL.length - 1) !== '/') {
      rootURL = `${rootURL}/`;
    }
    return rootURL;
  },

  didInsertElement() {
    var _this = this;
    var router = getOwner(this).lookup("router:main");

    this._super();

    scheduleOnce('afterRender', this, function(){
      $(".received_message, .my_message").on('click', 'a', function(e) {
        var $target = $(e.currentTarget);
        var handleClick = (e.which === 1 && !e.ctrlKey && !e.metaKey);

        if(handleClick && !$target.hasClass('ember-view') && isNone($target.attr('data-ember-action'))) {

          var rootURL = _this._getNormalisedRootUrl(router);
          var url = $target.attr('href');

          if(url && url.indexOf(rootURL) === 0) {
            url = url.substr(rootURL.length - 1);

            if(router.router.recognizer.recognize(url)) {
              router.handleURL(url);
              router.router.updateURL(url);
              return false;
            }
          }
        }
        return true;
      });
    });
  }

});

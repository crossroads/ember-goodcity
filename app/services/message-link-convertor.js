import Ember from "ember";
const { getOwner } = Ember;

export default Ember.Service.extend({
  i18n: Ember.inject.service(),

  convert: function(values) {
    var offerId = values.offer.id;
    values.body = values.body.trim();
    values.body = Ember.Handlebars.Utils.escapeExpression(values.body || "");
    values.body = values.body.replace(/(\r\n|\n|\r)/gm, "<br>");
    var msg = values.body;

    var url_with_text = msg.slice(msg.indexOf("[") + 1, msg.indexOf("]"));
    var url_text_begin = url_with_text.indexOf("|");
    var url_text = url_with_text.slice(0, url_text_begin);
    var url_for = url_with_text.slice(url_text_begin + 1).trim();

    if (url_for === "transport_page") {
      values.body = msg.replace(
        "[" + url_with_text + "]",
        `<a href='/offers/${offerId}/plan_delivery'>${url_text}</a>`
      );
    }

    if (url_for === "feedback_form") {
      values.body = msg.replace(
        "[" + url_with_text + "]",
        `<a href='https://crossroads-foundation.formstack.com/forms/goods_donor_survey?field114124226=${offerId}'>${url_text}</a>`
      );
    }
  }
});

import Service, { inject as service } from "@ember/service";

export default Service.extend({
  i18n: service(),

  convert: function (values) {
    var offerId = values.offer.id;
    var msg = values.body;
    var url_with_text = msg.slice(msg.indexOf("[") + 1, msg.indexOf("]"));
    var url_text_begin = url_with_text.indexOf("|");
    var url_text = url_with_text.slice(0, url_text_begin);
    var url_for = url_with_text.slice(url_text_begin + 1);

    if (url_for === "transport_page") {
      values.body = msg.replace(
        "[" + url_with_text + "]",
        `<a href='/offers/${offerId}/plan_delivery'>${url_text}</a>`
      );
    }
  },
});

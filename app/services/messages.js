import Ember from "ember";
const { getOwner } = Ember;

export default Ember.Service.extend({
  logger: Ember.inject.service(),
  session: Ember.inject.service(),
  store: Ember.inject.service(),

  fetchUnreadMessages() {
    return this.fetchMessages({ state: "unread" });
  },

  fetchReadMessages() {
    return this.fetchMessages({ state: "read" });
  },

  fetchMessages(opts = {}) {
    let batchSize = 20;
    let offerIds = this.get("store")
      .peekAll("offer")
      .mapBy("id");
    let promises = [];

    while (offerIds.length) {
      let batch = offerIds.splice(0, batchSize);
      promises.push(
        this.get("store").query("message", {
          offer_id: batch.join(","),
          ...opts
        })
      );
    }

    return Ember.RSVP.all(promises);
  },

  markRead(message) {
    if (message.get("isUnread")) {
      var adapter = getOwner(this).lookup("adapter:application");
      var url = adapter.buildURL("message", message.id) + "/mark_read";
      adapter
        .ajax(url, "PUT")
        .then(data => {
          delete data.message.id;
          message.setProperties(data.message);
        })
        .catch(error => this.get("logger").error(error));
    }
  },

  getMessageRoute(isDonorApp, itemId, isPrivate, offerId) {
    if (isDonorApp) {
      if (itemId) {
        return ["item.messages", offerId, itemId];
      } else {
        return ["offer.messages", offerId];
      }
    } else if (isPrivate) {
      if (itemId) {
        return ["review_item.supervisor_messages", offerId, itemId];
      } else {
        return ["offer.supervisor_messages", offerId];
      }
    } else {
      if (itemId) {
        return ["review_item.donor_messages", offerId, itemId];
      } else {
        return ["offer.donor_messages", offerId];
      }
    }
  },

  getRoute: function(message) {
    var isDonorApp = this.get("session.isDonorApp");
    var offerId = message.get ? message.get("offerId") : message.offer_id;
    var itemId = message.get ? message.get("itemId") : message.item_id;
    var isPrivate = message.get ? message.get("isPrivate") : message.is_private;
    isPrivate = isPrivate
      ? isPrivate.toString().toLowerCase() === "true"
      : false;

    var messageRoute = this.getMessageRoute(
      isDonorApp,
      itemId,
      isPrivate,
      offerId
    );

    return messageRoute;
  }
});

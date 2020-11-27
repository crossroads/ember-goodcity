import $ from 'jquery';
import { debounce } from '@ember/runloop';
import { observer, computed } from '@ember/object';
import { on } from '@ember/object/evented';
import { alias, sort, notEmpty } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({
  messageLinkConvertor: service(),
  body: "",
  offerController: controller("offer/offer_details"),
  messagesUtil: service("messages"),
  isPrivate: false,
  inProgress: false,
  offer: alias("offerController.model"),
  sortProperties: ["createdAt:asc"],
  sortedElements: sort("messagesAndVersions", "sortProperties"),
  isItemThread: notEmpty("item"),

  autoMarkAsRead: on('init',
    observer('isActive', 'messages.[]', 'messages.@each.state', function() {
      if (this.get('isActive')) {
        debounce(this, this.markConversationAsRead, 1500);
      }
    })
  ),

  disabled: computed("offer.isCancelled", "item.isDraft", function() {
    return this.get("offer.isCancelled") || this.get("item.isDraft");
  }),

  groupedElements: computed("sortedElements.[]", function() {
    return this.groupBy(this.get("sortedElements"), "createdDate");
  }),

  allMessages: computed(function() {
    return this.store.peekAll("message");
  }),

  messages: computed("allMessages.[]", "offer", "item", function() {
    var messages = this.get("allMessages");
    messages = this.get("isItemThread") ?
      messages.filterBy("itemId", this.get("item.id")) :
      messages
          .filterBy("offerId", this.get("offer.id"))
          .filterBy("item", null);
    return messages.filter(m => {
      return Boolean(m.get("isPrivate")) === this.get("isPrivate");
    });
  }),

  messagesAndVersions: computed(
    "messages.[]",
    "itemVersions",
    "packageVersions",
    "offerVersions",
    function() {
      var messages = this.get("messages").toArray();
      var itemVersions = this.get("itemVersions").toArray();
      var packageVersions = this.get("packageVersions").toArray();
      var offerVersions = this.get("offerVersions").toArray();
      return messages.concat(itemVersions, packageVersions, offerVersions);
    }
  ),

  itemVersions: computed(
    "item.id",
    "allVersions.[]",
    "isItemThread",
    function() {
      if (!this.get("isItemThread")) {
        return [];
      }
      var itemId = parseInt(this.get("item.id"), 10);
      return this.get("allVersions")
        .filterBy("itemId", itemId)
        .filterBy("itemType", "Item");
    }
  ),

  packageVersions: computed(
    "item.packages",
    "allVersions.[]",
    "isItemThread",
    function() {
      if (!this.get("isItemThread")) {
        return [];
      }
      var packageIds = (this.get("item.packages") || []).mapBy("id");
      return this.get("allVersions")
        .filterBy("itemType", "Package")
        .filter(function(log) {
          return (
            packageIds.indexOf(String(log.get("itemId"))) >= 0 &&
            ["received", "missing"].indexOf(log.get("state")) >= 0
          );
        });
    }
  ),

  allVersions: computed(function() {
    return this.get("store").peekAll("version");
  }),

  offerVersions: computed(
    "allVersions.[]",
    "offer.id",
    "isItemThread",
    function() {
      if (this.get("isItemThread")) {
        return [];
      }
      var offerId = parseInt(this.get("offer.id"), 10);
      return this.get("allVersions")
        .filterBy("itemType", "Offer")
        .filterBy("itemId", offerId);
    }
  ),

  groupBy: function(content, key) {
    var result = [];
    var object, value;

    content.forEach(function(item) {
      value = item.get ? item.get(key) : item[key];
      object = result.findBy("value", value);
      if (!object) {
        object = {
          value: value,
          items: []
        };
        result.push(object);
      }
      return object.items.push(item);
    });
    return result.getEach("items");
  },

  markConversationAsRead() {
    this.get("messages")
      .filterBy("state", "unread")
      .forEach(m => this.get("messagesUtil").markRead(m));
  },

  actions: {
    sendMessage() {
      // To hide soft keyboard
      $("textarea").trigger("blur");

      this.set("inProgress", true);
      var values = this.getProperties("body", "offer", "item", "isPrivate");
      values.itemId = this.get("item.id");
      values.offerId = this.get("offer.id");
      values.createdAt = new Date();
      values.sender = this.store.peekRecord(
        "user",
        this.get("session.currentUser.id")
      );
      this.get("messageLinkConvertor").convert(values);
      var message = this.store.createRecord("message", values);
      message
        .save()
        .then(() => {
          this.set("body", "");
        })
        .catch(error => {
          this.store.unloadRecord(message);
          throw error;
        })
        .finally(() => this.set("inProgress", false));

      $("body").animate({ scrollTop: $(document).height() }, 1000);
    }
  }
});

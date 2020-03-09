import { inject as controller } from '@ember/controller';
import Service, { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { AjaxBuilder } from '../utils/ajax-promise';

export default Service.extend({
  logger: service(),
  session: service(),
  store: service(),
  //subscriptions: controller(),

  unreadMessageCount: 0,

  init() {
    const subscriptionsController =
      this.container && this.container.lookup("controller:subscriptions");
    subscriptionsController &&
      subscriptionsController.on("create:message", ({ id }) => {
        const msg = this.get("store").peekRecord("message", id);
        if (msg.get("isUnread")) {
          this._incrementCount();
        }
      });
  },

  fetchUnreadMessages(page, perPage) {
    return this.fetchMessages(page, perPage, { state: "unread" });
  },

  fetchReadMessages(page, perPage) {
    return this.fetchMessages(page, perPage, { state: "read" });
  },

  fetchMessages(page = 1, perPage = 25, opts = {}) {
    const store = this.get('store');
    return this._queryMessages(page, perPage, opts)
      .then(data => {
        store.pushPayload(data);
        return data.messages.map(m => {
          return store.peekRecord('message', m.id);
        });
      })
  },

  fetchUnreadMessageCount() {
    return this._queryMessages(1,1, { state: "unread" })
      .then(data => {
        const count = (data.meta && data.meta.total_count);
        this.set('unreadMessageCount', count || 0);
      })
      .catch(e => this._onError(e));
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
          this._decrementCount();
        })
        .catch(e => this._onError(e));
    }
  },

  markAllRead() {
    return AjaxBuilder('/messages/mark_all_read')
      .withAuth(this.get('session.authToken'))
      .put()
      .then(() => {
        this.get("store")
          .peekAll('message')
          .filterBy("state", "unread")
          .forEach(message => {
            message.set('state', 'read');
          });
        this.set('unreadMessageCount', 0);
      });
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
  },

  _queryMessages(page = 1, perPage = 25, opts = {}) {
    const { scope = "offer", state } = opts;
    return AjaxBuilder('/messages')
      .withAuth(this.get('session.authToken'))
      .withQuery({ state, scope })
      .getPage(page, perPage);
  },

  _onError(e) {
    this.get("logger").error(e);
  },

  _incrementCount(step = 1) {
    const count = this.get('unreadMessageCount') + step;
    if (count < 0) {
      this.set('unreadMessageCount', 0);
    } else {
      this.set('unreadMessageCount', count);
    }
  },

  _decrementCount() {
    this._incrementCount(-1);
  }
});

import { alias, equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import DS from "ember-data";

var attr = DS.attr,
  belongsTo = DS.belongsTo;

export default DS.Model.extend({
  body: attr("string"),
  isPrivate: attr("boolean"),
  createdAt: attr("date"),
  updatedAt: attr("date"),
  offerId: attr("string"),
  itemId: attr("string"),
  state: attr("string", { defaultValue: "read" }),
  sender: belongsTo("user", { async: false }),
  item: belongsTo("item", { async: false }),
  offer: belongsTo("offer", { async: false }),

  myMessage: computed(function() {
    var session = getOwner(this).lookup("service:session");
    return this.get("sender.id") === session.get("currentUser.id");
  }),

  isMessage: computed("this", function() {
    return true;
  }),

  createdDate: computed(function() {
    return new Date(this.get("createdAt")).toDateString();
  }),

  itemImageUrl: alias("item.displayImageUrl"),
  isRead: equal("state", "read"),
  isUnread: equal("state", "unread")
});

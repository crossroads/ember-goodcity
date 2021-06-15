import DS from "ember-data";
import { alias, equal } from "@ember/object/computed";
import { computed } from "@ember/object";
import { getOwner } from "@ember/application";

export default DS.Model.extend({
  body: DS.attr("string"),
  isPrivate: DS.attr("boolean"),
  createdAt: DS.attr("date"),
  updatedAt: DS.attr("date"),
  offerId: DS.attr("string"),
  itemId: DS.attr("string"),
  state: DS.attr("string", { defaultValue: "read" }),
  sender: DS.belongsTo("user", { async: false }),
  item: DS.belongsTo("item", { async: false }),
  offer: DS.belongsTo("offer", { async: false }),

  myMessage: computed(function () {
    var session = getOwner(this).lookup("service:session");
    return this.get("sender.id") === session.get("currentUser.id");
  }),

  isMessage: computed("this", function () {
    return true;
  }),

  createdDate: computed(function () {
    return new Date(this.get("createdAt")).toDateString();
  }),

  itemImageUrl: alias("item.displayImageUrl"),
  isRead: equal("state", "read"),
  isUnread: equal("state", "unread"),
});

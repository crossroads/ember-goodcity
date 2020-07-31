import Ember from "ember";
import DS from "ember-data";
const { getOwner } = Ember;

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

  messageableType: attr("string"),
  messageableId: attr("string"),
  unreadCount: attr("string"),

  myMessage: Ember.computed(function() {
    var session = getOwner(this).lookup("service:session");
    return this.get("sender.id") === session.get("currentUser.id");
  }),
  messageableType: attr("string"),
  messageableId: attr("string"),
  lookup: attr("string"),
  parsedBody: Ember.computed("body", function() {
    let body = this.get("body");
    let lookup = this.get("lookup");
    lookup = JSON.parse(lookup);
    Object.keys(lookup).forEach(key => {
      body = body.replace(
        new RegExp(`\\[:${key}\\]`, "g"),
        `<span class='mentioned'>@${lookup[key].display_name}</span>`
      );
    });
    return body;
  }),

  plainBody: Ember.computed("body", function() {
    let body = this.get("body");
    let lookup = this.get("lookup");
    lookup = JSON.parse(lookup);
    Object.keys(lookup).forEach(key => {
      body = body.replace(
        new RegExp(`\\[:${key}\\]`, "g"),
        lookup[key].display_name
      );
    });
    return body;
  }),

  isMessage: Ember.computed("this", function() {
    return true;
  }),

  createdDate: Ember.computed(function() {
    return new Date(this.get("createdAt")).toDateString();
  }),

  itemImageUrl: Ember.computed.alias("item.displayImageUrl"),
  isRead: Ember.computed.equal("state", "read"),
  isUnread: Ember.computed.equal("state", "unread")
});

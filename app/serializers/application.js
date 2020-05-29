import { ActiveModelSerializer } from "active-model-adapter";

// Polymorphic associations are not supported in ember-data beta version:
// refer: https://github.com/emberjs/data/issues/1574

function normalize(payload) {
  const key =
    (payload.hasOwnProperty("messages") && "messages") ||
    (payload.hasOwnProperty("message") && "message");
  if (key) {
    const messages = Array.isArray(payload[key])
      ? payload[key]
      : Array(payload[key]);
    messages.forEach(m => {
      m[`${m.messageable_type.toLowerCase()}`] = m.messageable_id;
    });
  }
}

export default ActiveModelSerializer.extend({
  keyForAttribute: function(attr, method) {
    if (attr === "addressable") {
      return "addressable_id";
    }
    return this._super(attr, method);
  },
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    normalize(payload);
    return this._super(...arguments);
  },

  pushPayload(store, payload) {
    normalize(payload);
    return this._super(...arguments);
  }
});

import { get } from "@ember/object";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

import { run } from "@ember/runloop";

module("Message Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(5);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("message")
    );
    var state = Object.keys(model.toJSON()).indexOf("state") > -1;
    var updatedAt = Object.keys(model.toJSON()).indexOf("updatedAt") > -1;
    var createdAt = Object.keys(model.toJSON()).indexOf("createdAt") > -1;
    var isPrivate = Object.keys(model.toJSON()).indexOf("isPrivate") > -1;
    var body = Object.keys(model.toJSON()).indexOf("body") > -1;

    assert.ok(body);
    assert.ok(isPrivate);
    assert.ok(createdAt);
    assert.ok(updatedAt);
    assert.ok(state);
  });

  test("Relationships with other models", function (assert) {
    assert.expect(6);

    var message = this.owner.lookup("service:store").modelFor("message");
    var relationshipsWithItem = get(message, "relationshipsByName").get("item");
    var relationshipsWithUser = get(message, "relationshipsByName").get(
      "sender"
    );
    var relationshipsWithOffer = get(message, "relationshipsByName").get(
      "offer"
    );

    assert.equal(relationshipsWithItem.key, "item");
    assert.equal(relationshipsWithItem.kind, "belongsTo");

    assert.equal(relationshipsWithUser.key, "sender");
    assert.equal(relationshipsWithUser.kind, "belongsTo");

    assert.equal(relationshipsWithOffer.key, "offer");
    assert.equal(relationshipsWithOffer.kind, "belongsTo");
  });
});

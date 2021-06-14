import { get } from "@ember/object";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

import { run } from "@ember/runloop";

module("Contact Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(2);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("contact")
    );
    var name = Object.keys(model.toJSON()).indexOf("name") > -1;
    var mobile = Object.keys(model.toJSON()).indexOf("mobile") > -1;

    assert.ok(mobile);
    assert.ok(name);
  });

  test("Relationships with other models", function (assert) {
    assert.expect(2);

    var contact = this.owner.lookup("service:store").modelFor("contact");
    var relationshipsWithdelivery = get(contact, "relationshipsByName").get(
      "delivery"
    );

    assert.equal(relationshipsWithdelivery.key, "delivery");
    assert.equal(relationshipsWithdelivery.kind, "belongsTo");
  });
});

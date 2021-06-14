import { get } from "@ember/object";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

import { run } from "@ember/runloop";

module("RejectionReason Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(1);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("rejection_reason")
    );
    var name = Object.keys(model.toJSON()).indexOf("name") > -1;

    assert.ok(name);
  });

  test("Relationships with other models", function (assert) {
    assert.expect(2);

    var rejectionReason = this.owner
      .lookup("service:store")
      .modelFor("rejection_reason");
    var relationshipsWithDistrict = get(
      rejectionReason,
      "relationshipsByName"
    ).get("items");

    assert.equal(relationshipsWithDistrict.key, "items");
    assert.equal(relationshipsWithDistrict.kind, "hasMany");
  });
});

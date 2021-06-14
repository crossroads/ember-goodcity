import { get } from "@ember/object";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Addressable Model", function (hooks) {
  setupTest(hooks);

  test("Relationships with other models", function (assert) {
    assert.expect(2);

    var addressable = this.owner
      .lookup("service:store")
      .modelFor("addressable");
    var relationshipsWithAddress = get(addressable, "relationshipsByName").get(
      "address"
    );

    assert.equal(relationshipsWithAddress.key, "address");
    assert.equal(relationshipsWithAddress.kind, "belongsTo");
  });
});

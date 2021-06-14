import { get } from "@ember/object";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

import { run } from "@ember/runloop";

module("DonorCondition Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(1);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("donor_condition")
    );
    var name = Object.keys(model.toJSON()).indexOf("name") > -1;

    assert.ok(name);
  });

  test("Relationships with other models", function (assert) {
    assert.expect(2);

    var donor_condition = this.owner
      .lookup("service:store")
      .modelFor("donor_condition");
    var relationshipsWithItem = get(donor_condition, "relationshipsByName").get(
      "items"
    );

    assert.equal(relationshipsWithItem.key, "items");
    assert.equal(relationshipsWithItem.kind, "hasMany");
  });
});

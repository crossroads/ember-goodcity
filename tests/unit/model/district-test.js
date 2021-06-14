import { get } from "@ember/object";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

import { run } from "@ember/runloop";

module("District Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(1);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("district")
    );
    var name = Object.keys(model.toJSON()).indexOf("name") > -1;

    assert.ok(name);
  });

  test("Relationships with other models", function (assert) {
    assert.expect(2);

    var district = this.owner.lookup("service:store").modelFor("district");
    var relationshipsWithTerritory = get(district, "relationshipsByName").get(
      "territory"
    );

    assert.equal(relationshipsWithTerritory.key, "territory");
    assert.equal(relationshipsWithTerritory.kind, "belongsTo");
  });
});

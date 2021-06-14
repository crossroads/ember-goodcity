import { get } from "@ember/object";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

import { run } from "@ember/runloop";

module("Schedule Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(5);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("schedule")
    );
    var zone = Object.keys(model.toJSON()).indexOf("zone") > -1;
    var scheduledAt = Object.keys(model.toJSON()).indexOf("scheduledAt") > -1;
    var slotName = Object.keys(model.toJSON()).indexOf("slotName") > -1;
    var slot = Object.keys(model.toJSON()).indexOf("slot") > -1;
    var resource = Object.keys(model.toJSON()).indexOf("resource") > -1;

    assert.ok(resource);
    assert.ok(slot);
    assert.ok(slotName);
    assert.ok(zone);
    assert.ok(scheduledAt);
  });

  test("Relationships with other models", function (assert) {
    assert.expect(2);

    var schedule = this.owner.lookup("service:store").modelFor("schedule");
    var relationshipsWithDelivery = get(schedule, "relationshipsByName").get(
      "deliveries"
    );

    assert.equal(relationshipsWithDelivery.key, "deliveries");
    assert.equal(relationshipsWithDelivery.kind, "hasMany");
  });
});

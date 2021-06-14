import { get } from "@ember/object";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

import { run } from "@ember/runloop";

module("Image Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(3);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("image")
    );
    var angle = Object.keys(model.toJSON()).indexOf("angle") > -1;
    var cloudinaryId = Object.keys(model.toJSON()).indexOf("cloudinaryId") > -1;
    var favourite = Object.keys(model.toJSON()).indexOf("favourite") > -1;

    assert.ok(favourite);
    assert.ok(cloudinaryId);
    assert.ok(angle);
  });

  test("Relationships with other models", function (assert) {
    assert.expect(2);

    var image = this.owner.lookup("service:store").modelFor("image");
    var relationshipsWithItem = get(image, "relationshipsByName").get("item");

    assert.equal(relationshipsWithItem.key, "item");
    assert.equal(relationshipsWithItem.kind, "belongsTo");
  });
});

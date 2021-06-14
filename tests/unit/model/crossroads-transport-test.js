import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

import { run } from "@ember/runloop";

module("CrossroadsTransport Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(3);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("crossroads_transport")
    );
    var name = Object.keys(model.toJSON()).indexOf("name") > -1;
    var cost = Object.keys(model.toJSON()).indexOf("cost") > -1;
    var isVanAllowed = Object.keys(model.toJSON()).indexOf("isVanAllowed") > -1;

    assert.ok(isVanAllowed);
    assert.ok(name);
    assert.ok(cost);
  });
});

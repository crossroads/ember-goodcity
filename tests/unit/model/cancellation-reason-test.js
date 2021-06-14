import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

import { run } from "@ember/runloop";

module("CancellationReason Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(1);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("cancellation_reason")
    );
    var name = Object.keys(model.toJSON()).indexOf("name") > -1;

    assert.ok(name);
  });
});

import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

import { run } from "@ember/runloop";

module("GogovenTransport Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(2);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("gogovan_transport")
    );
    var name = Object.keys(model.toJSON()).indexOf("name") > -1;
    var disabled = Object.keys(model.toJSON()).indexOf("disabled") > -1;

    assert.ok(disabled);
    assert.ok(name);
  });
});

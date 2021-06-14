import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

import { run } from "@ember/runloop";

module("Holiday Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(3);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("holiday")
    );
    var name = Object.keys(model.toJSON()).indexOf("name") > -1;
    var year = Object.keys(model.toJSON()).indexOf("year") > -1;
    var holiday = Object.keys(model.toJSON()).indexOf("holiday") > -1;

    assert.ok(holiday);
    assert.ok(year);
    assert.ok(name);
  });
});

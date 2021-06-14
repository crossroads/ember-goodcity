import { run } from "@ember/runloop";
import { get } from "@ember/object";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Territory Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(1);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("territory")
    );
    var name = Object.keys(model.toJSON()).indexOf("name") > -1;

    assert.ok(name);
  });

  test("Relationships with other models", function (assert) {
    assert.expect(2);

    var territory = this.owner.lookup("service:store").modelFor("territory");
    var relationshipsWithDistrict = get(territory, "relationshipsByName").get(
      "districts"
    );

    assert.equal(relationshipsWithDistrict.key, "districts");
    assert.equal(relationshipsWithDistrict.kind, "hasMany");
  });

  test("Territory is a valid ember-data Model", function (assert) {
    assert.expect(1);

    var store = this.owner.lookup("service:store");
    var record = null;

    run(function () {
      store.createRecord("territory", { id: 1, name: "Hong Kong Island" });
      record = store.peekRecord("territory", 1);
    });

    assert.equal(record.get("name"), "Hong Kong Island");
  });
});

import { run } from "@ember/runloop";
import { get } from "@ember/object";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Address Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(5);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("address")
    );
    var flat = Object.keys(model.toJSON()).indexOf("flat") > -1;
    var building = Object.keys(model.toJSON()).indexOf("building") > -1;
    var street = Object.keys(model.toJSON()).indexOf("street") > -1;
    var addressType = Object.keys(model.toJSON()).indexOf("addressType") > -1;
    var addressableType =
      Object.keys(model.toJSON()).indexOf("addressableType") > -1;

    assert.ok(flat);
    assert.ok(building);
    assert.ok(street);
    assert.ok(addressType);
    assert.ok(addressableType);
  });

  test("Relationships with other models", function (assert) {
    assert.expect(4);

    var address = this.owner.lookup("service:store").modelFor("address");
    var relationshipsWithDistrict = get(address, "relationshipsByName").get(
      "district"
    );
    var relationshipsWithAddressable = get(address, "relationshipsByName").get(
      "addressable"
    );

    assert.equal(relationshipsWithDistrict.key, "district");
    assert.equal(relationshipsWithDistrict.kind, "belongsTo");

    assert.equal(relationshipsWithAddressable.key, "addressable");
    assert.equal(relationshipsWithAddressable.kind, "belongsTo");
  });

  test("Address is a valid ember-data Model", function (assert) {
    assert.expect(3);

    var store = this.owner.lookup("service:store");
    var record = null;

    run(function () {
      store.createRecord("address", {
        id: 1,
        flat: "Suite 888",
        building: "4976",
        street: "Jacobson Fields",
      });
      record = store.peekRecord("address", 1);
    });

    assert.equal(record.get("flat"), "Suite 888");
    assert.equal(record.get("building"), "4976");
    assert.equal(record.get("street"), "Jacobson Fields");
  });
});

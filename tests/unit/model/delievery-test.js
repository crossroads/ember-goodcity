import { run } from "@ember/runloop";
import { get } from "@ember/object";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Delivery Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(3);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("delivery")
    );
    var start = Object.keys(model.toJSON()).indexOf("start") > -1;
    var finish = Object.keys(model.toJSON()).indexOf("finish") > -1;
    var deliveryType = Object.keys(model.toJSON()).indexOf("deliveryType") > -1;

    assert.ok(start);
    assert.ok(finish);
    assert.ok(deliveryType);
  });

  test("Relationships with other models", function (assert) {
    assert.expect(8);

    var delivery = this.owner.lookup("service:store").modelFor("delivery");
    var relationshipWithOffer = get(delivery, "relationshipsByName").get(
      "offer"
    );
    var relationshipWithContact = get(delivery, "relationshipsByName").get(
      "contact"
    );
    var relationshipWithSchedule = get(delivery, "relationshipsByName").get(
      "schedule"
    );
    var relationshipWithGogovanOrder = get(delivery, "relationshipsByName").get(
      "gogovanOrder"
    );

    assert.equal(relationshipWithOffer.key, "offer");
    assert.equal(relationshipWithOffer.kind, "belongsTo");

    assert.equal(relationshipWithContact.key, "contact");
    assert.equal(relationshipWithContact.kind, "belongsTo");

    assert.equal(relationshipWithSchedule.key, "schedule");
    assert.equal(relationshipWithSchedule.kind, "belongsTo");

    assert.equal(relationshipWithGogovanOrder.key, "gogovanOrder");
    assert.equal(relationshipWithGogovanOrder.kind, "belongsTo");
  });

  test("computed property: isGogovan", function (assert) {
    assert.expect(1);
    var delivery = run(() =>
      this.owner
        .lookup("service:store")
        .createRecord("delivery", { deliveryType: "Gogovan" })
    );
    assert.equal(delivery.get("isGogovan"), true);
  });

  test("computed property: isDropOff", function (assert) {
    assert.expect(1);
    var delivery = run(() =>
      this.owner
        .lookup("service:store")
        .createRecord("delivery", { deliveryType: "Drop Off" })
    );
    assert.equal(delivery.get("isDropOff"), true);
  });

  test("computed property: isAlternate", function (assert) {
    assert.expect(1);
    var delivery = run(() =>
      this.owner
        .lookup("service:store")
        .createRecord("delivery", { deliveryType: "Alternate" })
    );
    assert.equal(delivery.get("isAlternate"), true);
  });

  test("computed property: noDropOff", function (assert) {
    assert.expect(1);
    var delivery = run(() =>
      this.owner
        .lookup("service:store")
        .createRecord("delivery", { deliveryType: "Alternate" })
    );
    assert.equal(delivery.get("noDropOff"), true);
  });

  test("computed property: noGogovan", function (assert) {
    assert.expect(1);
    var delivery = run(() =>
      this.owner
        .lookup("service:store")
        .createRecord("delivery", { deliveryType: "Alternate" })
    );
    assert.equal(delivery.get("noGogovan"), true);
  });

  test("Delivery is a valid ember-data Model", function (assert) {
    assert.expect(3);

    var store = this.owner.lookup("service:store");
    var record = null;
    var date = new Date("2015/03/25");

    run(function () {
      store.createRecord("delivery", {
        id: 1,
        start: date,
        finish: date,
        deliveryType: "Gogovan",
      });
      record = store.peekRecord("delivery", 1);
    });

    assert.equal(record.get("deliveryType"), "Gogovan");
    assert.equal(record.get("start"), date);
    assert.equal(record.get("finish"), date);
  });
});

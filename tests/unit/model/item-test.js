import { run } from "@ember/runloop";
import { get } from "@ember/object";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Item Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(6);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("item")
    );
    var donorDescription =
      Object.keys(model.toJSON()).indexOf("donorDescription") > -1;
    var state = Object.keys(model.toJSON()).indexOf("state") > -1;
    var rejectReason = Object.keys(model.toJSON()).indexOf("rejectReason") > -1;
    var rejectionComments =
      Object.keys(model.toJSON()).indexOf("rejectionComments") > -1;
    var createdAt = Object.keys(model.toJSON()).indexOf("createdAt") > -1;
    var updatedAt = Object.keys(model.toJSON()).indexOf("updatedAt") > -1;

    assert.ok(rejectionComments);
    assert.ok(createdAt);
    assert.ok(updatedAt);
    assert.ok(donorDescription);
    assert.ok(state);
    assert.ok(rejectReason);
  });

  test("Relationships with other models", function (assert) {
    assert.expect(14);

    var item = this.owner.lookup("service:store").modelFor("item");
    var relationshipsWithPackages = get(item, "relationshipsByName").get(
      "packages"
    );
    var relationshipsWithMessages = get(item, "relationshipsByName").get(
      "messages"
    );
    var relationshipsWithImages = get(item, "relationshipsByName").get(
      "images"
    );
    var relationshipsWithOffer = get(item, "relationshipsByName").get("offer");
    var relationshipsWithPackageType = get(item, "relationshipsByName").get(
      "packageType"
    );
    var relationshipsWithDonorCondition = get(item, "relationshipsByName").get(
      "donorCondition"
    );
    var relationshipsWithRejectionReason = get(item, "relationshipsByName").get(
      "rejectionReason"
    );

    assert.equal(relationshipsWithPackages.key, "packages");
    assert.equal(relationshipsWithPackages.kind, "hasMany");

    assert.equal(relationshipsWithMessages.key, "messages");
    assert.equal(relationshipsWithMessages.kind, "hasMany");

    assert.equal(relationshipsWithImages.key, "images");
    assert.equal(relationshipsWithImages.kind, "hasMany");

    assert.equal(relationshipsWithOffer.key, "offer");
    assert.equal(relationshipsWithOffer.kind, "belongsTo");

    assert.equal(relationshipsWithPackageType.key, "packageType");
    assert.equal(relationshipsWithPackageType.kind, "belongsTo");

    assert.equal(relationshipsWithDonorCondition.key, "donorCondition");
    assert.equal(relationshipsWithDonorCondition.kind, "belongsTo");

    assert.equal(relationshipsWithRejectionReason.key, "rejectionReason");
    assert.equal(relationshipsWithRejectionReason.kind, "belongsTo");
  });

  test("computed property: isAccepted", function (assert) {
    assert.expect(1);
    var item = run(() =>
      this.owner
        .lookup("service:store")
        .createRecord("item", { state: "accepted" })
    );
    assert.equal(item.get("isAccepted"), true);
  });

  test("computed property: isRejected", function (assert) {
    assert.expect(1);
    var item = run(() =>
      this.owner
        .lookup("service:store")
        .createRecord("item", { state: "rejected" })
    );
    assert.equal(item.get("isRejected"), true);
  });

  test("computed property: isDrafted", function (assert) {
    assert.expect(1);
    var item = run(() =>
      this.owner
        .lookup("service:store")
        .createRecord("item", { state: "draft" })
    );
    assert.equal(item.get("isDrafted"), true);
  });

  test("Item is a valid ember-data Model", function (assert) {
    assert.expect(1);

    var store = this.owner.lookup("service:store");
    var record = null;

    run(function () {
      store.createRecord("item", { id: 1, state: "accepted" });
      record = store.peekRecord("item", 1);
    });

    assert.equal(record.get("state"), "accepted");
  });
});

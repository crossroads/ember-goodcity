import { get } from "@ember/object";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

import { run } from "@ember/runloop";

module("PackageType Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(3);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("package_type")
    );
    var name = Object.keys(model.toJSON()).indexOf("name") > -1;
    var isItemTypeNode =
      Object.keys(model.toJSON()).indexOf("isItemTypeNode") > -1;
    var code = Object.keys(model.toJSON()).indexOf("code") > -1;

    assert.ok(code);
    assert.ok(isItemTypeNode);
    assert.ok(name);
  });

  test("Relationships with other models", function (assert) {
    assert.expect(4);

    var packageType = this.owner
      .lookup("service:store")
      .modelFor("package_type");
    var relationshipsWithItem = get(packageType, "relationshipsByName").get(
      "items"
    );
    var relationshipsWithPackage = get(packageType, "relationshipsByName").get(
      "packages"
    );

    assert.equal(relationshipsWithPackage.key, "packages");
    assert.equal(relationshipsWithPackage.kind, "hasMany");

    assert.equal(relationshipsWithItem.key, "items");
    assert.equal(relationshipsWithItem.kind, "hasMany");
  });
});

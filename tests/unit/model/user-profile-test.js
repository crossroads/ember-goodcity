import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import { run } from "@ember/runloop";

// import Ember from 'ember';

module("UserProfile Model", function (hooks) {
  setupTest(hooks);

  test("check attributes", function (assert) {
    assert.expect(5);
    var model = run(() =>
      this.owner.lookup("service:store").createRecord("user_profile")
    );
    var firstName = Object.keys(model.toJSON()).indexOf("firstName") > -1;
    var lastName = Object.keys(model.toJSON()).indexOf("lastName") > -1;
    var mobile = Object.keys(model.toJSON()).indexOf("mobile") > -1;
    var donationAmount =
      Object.keys(model.toJSON()).indexOf("donationAmount") > -1;
    var donationDate = Object.keys(model.toJSON()).indexOf("donationDate") > -1;

    assert.ok(donationDate);
    assert.ok(donationAmount);
    assert.ok(mobile);
    assert.ok(lastName);
    assert.ok(firstName);
  });

  // test('Relationships with other models', function(assert){
  //   assert.expect(2);

  //   var user = this.store().modelFor('user');
  //   var relationshipsWithPermission = Ember.get(user, 'relationshipsByName').get('permission');

  //   assert.equal(relationshipsWithPermission.key, 'permission');
  //   assert.equal(relationshipsWithPermission.kind, 'belongsTo');
  // });
});

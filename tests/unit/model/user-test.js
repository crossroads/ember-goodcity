import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('user', 'User Model', {
  needs: ['model:image', 'model:permission', 'model:offer', 'model:address', 'model:user-role']
});

test('check attributes', function(assert){
  assert.expect(6);
  var model = this.subject();
  var lastDisconnected = Object.keys(model.toJSON()).indexOf('lastDisconnected') > -1;
  var lastConnected = Object.keys(model.toJSON()).indexOf('lastConnected') > -1;
  var createdAt = Object.keys(model.toJSON()).indexOf('createdAt') > -1;
  var mobile = Object.keys(model.toJSON()).indexOf('mobile') > -1;
  var lastName = Object.keys(model.toJSON()).indexOf('lastName') > -1;
  var firstName = Object.keys(model.toJSON()).indexOf('firstName') > -1;

  assert.ok(firstName);
  assert.ok(lastName);
  assert.ok(mobile);
  assert.ok(createdAt);
  assert.ok(lastConnected);
  assert.ok(lastDisconnected);
});

test('Relationships with other models', function(assert){
  assert.expect(6);

  var user = this.store().modelFor('user');
  var relationshipsWithImage = Ember.get(user, 'relationshipsByName').get('image');
  var relationshipsWithPermission = Ember.get(user, 'relationshipsByName').get('permission');
  var relationshipsWithReviewedOffers = Ember.get(user, 'relationshipsByName').get('reviewedOffers');

  assert.equal(relationshipsWithPermission.key, 'permission');
  assert.equal(relationshipsWithPermission.kind, 'belongsTo');

  assert.equal(relationshipsWithReviewedOffers.key, 'reviewedOffers');
  assert.equal(relationshipsWithReviewedOffers.kind, 'hasMany');

  assert.equal(relationshipsWithImage.key, 'image');
  assert.equal(relationshipsWithImage.kind, 'belongsTo');
});

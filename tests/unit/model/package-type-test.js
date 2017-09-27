import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('package_type', 'PackageType Model', {
  needs: ['model:item', 'model:package']
});

test('check attributes', function(assert){
  assert.expect(3);
  var model = this.subject();
  var name = Object.keys(model.toJSON()).indexOf('name') > -1;
  var isItemTypeNode = Object.keys(model.toJSON()).indexOf('isItemTypeNode') > -1;
  var code = Object.keys(model.toJSON()).indexOf('code') > -1;

  assert.ok(code);
  assert.ok(isItemTypeNode);
  assert.ok(name);
});

test('Relationships with other models', function(assert){
  assert.expect(4);

  var packageType = this.store().modelFor('package_type');
  var relationshipsWithItem = Ember.get(packageType, 'relationshipsByName').get('items');
  var relationshipsWithPackage = Ember.get(packageType, 'relationshipsByName').get('packages');

  assert.equal(relationshipsWithPackage.key, 'packages');
  assert.equal(relationshipsWithPackage.kind, 'hasMany');

  assert.equal(relationshipsWithItem.key, 'items');
  assert.equal(relationshipsWithItem.kind, 'hasMany');
});

import { test, moduleForModel } from 'ember-qunit';

moduleForModel('version', 'Version Model', {
});

test('check attributes', function(assert){
  assert.expect(7);
  var model = this.subject();
  var itemType = Object.keys(model.toJSON()).indexOf('itemType') > -1;
  var itemId = Object.keys(model.toJSON()).indexOf('itemId') > -1;
  var whodunnit = Object.keys(model.toJSON()).indexOf('whodunnit') > -1;
  var event = Object.keys(model.toJSON()).indexOf('event') > -1;
  var whodunnitName = Object.keys(model.toJSON()).indexOf('whodunnitName') > -1;
  var state = Object.keys(model.toJSON()).indexOf('state') > -1;
  var createdAt = Object.keys(model.toJSON()).indexOf('createdAt') > -1;

  assert.ok(createdAt);
  assert.ok(state);
  assert.ok(whodunnitName);
  assert.ok(event);
  assert.ok(whodunnit);
  assert.ok(itemId);
  assert.ok(itemType);
});

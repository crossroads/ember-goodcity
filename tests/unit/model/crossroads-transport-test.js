import { test, moduleForModel } from 'ember-qunit';

moduleForModel('crossroads_transport', 'CrossroadsTransport Model', {
});

test('check attributes', function(assert){
  assert.expect(3);
  var model = this.subject();
  var name = Object.keys(model.toJSON()).indexOf('name') > -1;
  var cost = Object.keys(model.toJSON()).indexOf('cost') > -1;
  var isVanAllowed = Object.keys(model.toJSON()).indexOf('isVanAllowed') > -1;

  assert.ok(isVanAllowed);
  assert.ok(name);
  assert.ok(cost);
});

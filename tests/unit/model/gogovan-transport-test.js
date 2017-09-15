import { test, moduleForModel } from 'ember-qunit';

moduleForModel('gogoven_transport', 'GogovenTransport Model', {
});

test('check attributes', function(assert){
  assert.expect(1);
  var model = this.subject();
  var name = Object.keys(model.toJSON()).indexOf('name') > -1;
  var disabled = Object.keys(model.toJSON()).indexOf('disabled') > -1;

  assert.ok(disabled);
  assert.ok(name);
});

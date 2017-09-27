import { test, moduleForModel } from 'ember-qunit';

moduleForModel('cancellation_reason', 'CancellationReason Model', {
});

test('check attributes', function(assert){
  assert.expect(1);
  var model = this.subject();
  var name = Object.keys(model.toJSON()).indexOf('name') > -1;

  assert.ok(name);
});

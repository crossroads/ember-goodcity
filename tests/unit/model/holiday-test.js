import { test, moduleForModel } from 'ember-qunit';

moduleForModel('holiday', 'Holiday Model', {
});

test('check attributes', function(assert){
  assert.expect(3);
  var model = this.subject();
  var name = Object.keys(model.toJSON()).indexOf('name') > -1;
  var year = Object.keys(model.toJSON()).indexOf('year') > -1;
  var holiday = Object.keys(model.toJSON()).indexOf('holiday') > -1;

  assert.ok(holiday);
  assert.ok(year);
  assert.ok(name);
});

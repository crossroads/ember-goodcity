import { get } from '@ember/object';
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('schedule', 'Schedule Model', {
  needs: ['model:delivery', 'service:i18n']
});

test('check attributes', function(assert){
  assert.expect(5);
  var model = this.subject();
  var zone = Object.keys(model.toJSON()).indexOf('zone') > -1;
  var scheduledAt = Object.keys(model.toJSON()).indexOf('scheduledAt') > -1;
  var slotName = Object.keys(model.toJSON()).indexOf('slotName') > -1;
  var slot = Object.keys(model.toJSON()).indexOf('slot') > -1;
  var resource = Object.keys(model.toJSON()).indexOf('resource') > -1;

  assert.ok(resource);
  assert.ok(slot);
  assert.ok(slotName);
  assert.ok(zone);
  assert.ok(scheduledAt);
});

test('Relationships with other models', function(assert){
  assert.expect(2);

  var schedule = this.store().modelFor('schedule');
  var relationshipsWithDelivery = get(schedule, 'relationshipsByName').get('deliveries');

  assert.equal(relationshipsWithDelivery.key, 'deliveries');
  assert.equal(relationshipsWithDelivery.kind, 'hasMany');
});

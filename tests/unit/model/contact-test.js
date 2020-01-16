import { get } from '@ember/object';
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('contact', 'Contact Model', {
  needs: ['model:delivery', 'model:address', 'model:addressable']
});

test('check attributes', function(assert){
  assert.expect(2);
  var model = this.subject();
  var name = Object.keys(model.toJSON()).indexOf('name') > -1;
  var mobile = Object.keys(model.toJSON()).indexOf('mobile') > -1;

  assert.ok(mobile);
  assert.ok(name);
});

test('Relationships with other models', function(assert){
  assert.expect(2);

  var contact = this.store().modelFor('contact');
  var relationshipsWithdelivery = get(contact, 'relationshipsByName').get('delivery');

  assert.equal(relationshipsWithdelivery.key, 'delivery');
  assert.equal(relationshipsWithdelivery.kind, 'belongsTo');
});

import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('addressable', 'Addressable Model', {
  needs: ['model:address']
});

test('Relationships with other models', function(assert){
  assert.expect(2);

  var addressable = this.store().modelFor('addressable');
  var relationshipsWithDelivery = Ember.get(addressable, 'relationshipsByName').get('address');

  assert.equal(relationshipsWithDelivery.key, 'address');
  assert.equal(relationshipsWithDelivery.kind, 'belongsTo');
});


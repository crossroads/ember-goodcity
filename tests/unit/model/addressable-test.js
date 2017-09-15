import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('addressable', 'Addressable Model', {
  needs: ['model:address']
});

test('Relationships with other models', function(assert){
  assert.expect(2);

  var addressable = this.store().modelFor('addressable');
  var relationshipsWithDistrict = Ember.get(addressable, 'relationshipsByName').get('address');

  assert.equal(relationshipsWithDistrict.key, 'address');
  assert.equal(relationshipsWithDistrict.kind, 'belongsTo');
});

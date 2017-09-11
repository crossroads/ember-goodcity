import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('address', 'Address Model', {
  needs: ['model:district', 'model:addressable']
});

test('Relationships with other models', function(assert){
  assert.expect(2);

  var address = this.store().modelFor('address');
  var relationshipsWithDistrict = Ember.get(address, 'relationshipsByName').get('district');
  var relationshipsWithAddressable = Ember.get(address, 'relationshipsByName').get('addressable');

  assert.equal(relationshipsWithDistrict.key, 'district');
  assert.equal(relationshipsWithAddressable.key, 'addressable');
});

test('Address is a valid ember-data Model', function(assert){
  assert.expect(3);

  var store = this.store();
  var record = null;

  Ember.run(function(){
    store.createRecord('address', { id: 1, flat: "Suite 888", building: "4976", street: "Jacobson Fields" });
    record = store.peekRecord('address', 1);
  });

  assert.equal(record.get('flat'), "Suite 888");
  assert.equal(record.get('building'), "4976");
  assert.equal(record.get('street'), "Jacobson Fields");
});

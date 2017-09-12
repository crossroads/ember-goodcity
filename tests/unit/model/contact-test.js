import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('contact', 'Contact Model', {
  needs: ['model:delivery']
});

test('Relationships with other models', function(assert){
  assert.expect(2);

  var contact = this.store().modelFor('contact');
  var relationshipsWithDelivery = Ember.get(contact, 'relationshipsByName').get('delivery');

  assert.equal(relationshipsWithDelivery.key, 'delivery');
  assert.equal(relationshipsWithDelivery.kind, 'belongsTo');
});

test('Contact is a valid ember-data Model', function(assert){
  assert.expect(1);

  var store = this.store();
  var record = null;

  Ember.run(function(){
    store.createRecord('contact', { id: 1, name: 'John' });
    record = store.peekRecord('contact', 1);
  });

  assert.equal(record.get('name'), "John");
});


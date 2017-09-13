import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('gogovan_order', 'GogovanOrder Model', {
  needs: ['model:delivery']
});

test('Relationships with other models', function(assert){
  assert.expect(2);

  var gogovan_order = this.store().modelFor('gogovan_order');
  var relationshipsWithDelivery = Ember.get(gogovan_order, 'relationshipsByName').get('delivery');

  assert.equal(relationshipsWithDelivery.key, 'delivery');
  assert.equal(relationshipsWithDelivery.kind, 'belongsTo');
});

test('GogovanOrder is a valid ember-data Model', function(assert){
  assert.expect(1);

  var store = this.store();
  var record = null;

  Ember.run(function(){
    store.createRecord('gogovan_order', { id: 1, name: "LocalOrder" });
    record = store.peekRecord('gogovan_order', 1);
  });

  assert.equal(record.get('name'), "LocalOrder");
});

import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('territory', 'Territory Model', {
  needs: ['model:district']
});

test('Relationships with other models', function(assert){
  assert.expect(2);

  var territory = this.store().modelFor('territory');
  var relationshipsWithDistrict = Ember.get(territory, 'relationshipsByName').get('districts');

  assert.equal(relationshipsWithDistrict.key, 'districts');
  assert.equal(relationshipsWithDistrict.kind, 'hasMany');
});

test('Territory is a valid ember-data Model', function(assert){
  assert.expect(1);

  var store = this.store();
  var record = null;

  Ember.run(function(){
    store.createRecord('territory', { id: 1, name: "Hong Kong Island" });
    record = store.peekRecord('territory', 1);
  });

  assert.equal(record.get('name'), "Hong Kong Island");
});

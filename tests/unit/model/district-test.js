import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('district', 'District Model', {
  needs: ['model:territory']
});

test('check attributes', function(assert){
  assert.expect(1);
  var model = this.subject();
  var name = Object.keys(model.toJSON()).indexOf('name') > -1;

  assert.ok(name);
});

test('Relationships with other models', function(assert){
  assert.expect(2);

  var district = this.store().modelFor('district');
  var relationshipsWithTerritory = Ember.get(district, 'relationshipsByName').get('territory');

  assert.equal(relationshipsWithTerritory.key, 'territory');
  assert.equal(relationshipsWithTerritory.kind, 'belongsTo');
});

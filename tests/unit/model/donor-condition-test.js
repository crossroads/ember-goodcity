import { get } from '@ember/object';
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('donor_condition', 'DonorCondition Model', {
  needs: ['model:item']
});

test('check attributes', function(assert){
  assert.expect(1);
  var model = this.subject();
  var name = Object.keys(model.toJSON()).indexOf('name') > -1;

  assert.ok(name);
});

test('Relationships with other models', function(assert){
  assert.expect(2);

  var donor_condition = this.store().modelFor('donor_condition');
  var relationshipsWithItem = get(donor_condition, 'relationshipsByName').get('items');

  assert.equal(relationshipsWithItem.key, 'items');
  assert.equal(relationshipsWithItem.kind, 'hasMany');
});

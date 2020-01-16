import { get } from '@ember/object';
import { test, moduleForModel } from 'ember-qunit';

moduleForModel('rejection_reason', 'RejectionReason Model', {
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

  var rejectionReason = this.store().modelFor('rejection_reason');
  var relationshipsWithDistrict = get(rejectionReason, 'relationshipsByName').get('items');

  assert.equal(relationshipsWithDistrict.key, 'items');
  assert.equal(relationshipsWithDistrict.kind, 'hasMany');
});

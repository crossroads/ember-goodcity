import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('image', 'Image Model', {
  needs: ['model:item']
});

test('check attributes', function(assert){
  assert.expect(3);
  var model = this.subject();
  var angle = Object.keys(model.toJSON()).indexOf('angle') > -1;
  var cloudinaryId = Object.keys(model.toJSON()).indexOf('cloudinaryId') > -1;
  var favourite = Object.keys(model.toJSON()).indexOf('favourite') > -1;

  assert.ok(favourite);
  assert.ok(cloudinaryId);
  assert.ok(angle);
});

test('Relationships with other models', function(assert){
  assert.expect(2);

  var image = this.store().modelFor('image');
  var relationshipsWithItem = Ember.get(image, 'relationshipsByName').get('item');

  assert.equal(relationshipsWithItem.key, 'item');
  assert.equal(relationshipsWithItem.kind, 'belongsTo');
});

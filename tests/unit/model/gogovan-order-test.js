import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('gogovan_order', 'GogovanOrder Model', {
  needs: ['model:delivery', 'service:i18n']
});

test('check attributes', function(assert){
  assert.expect(26);
  var model = this.subject();
  var name = Object.keys(model.toJSON()).indexOf('name') > -1;
  var mobile = Object.keys(model.toJSON()).indexOf('mobile') > -1;
  var bookingId = Object.keys(model.toJSON()).indexOf('bookingId') > -1;
  var status = Object.keys(model.toJSON()).indexOf('status') > -1;
  var pickupTime = Object.keys(model.toJSON()).indexOf('pickupTime') > -1;
  var slot = Object.keys(model.toJSON()).indexOf('slot') > -1;
  var districtId = Object.keys(model.toJSON()).indexOf('districtId') > -1;
  var territoryId = Object.keys(model.toJSON()).indexOf('territoryId') > -1;
  var offerId = Object.keys(model.toJSON()).indexOf('offerId') > -1;
  var gogovanOptionId = Object.keys(model.toJSON()).indexOf('gogovanOptionId') > -1;
  var completedAt = Object.keys(model.toJSON()).indexOf('completedAt') > -1;
  var needEnglish = Object.keys(model.toJSON()).indexOf('needEnglish') > -1;
  var needCart = Object.keys(model.toJSON()).indexOf('needCart') > -1;
  var needCarry = Object.keys(model.toJSON()).indexOf('needCarry') > -1;
  var needOver6ft = Object.keys(model.toJSON()).indexOf('needOver6ft') > -1;
  var removeNet = Object.keys(model.toJSON()).indexOf('removeNet') > -1;
  var baseFee = Object.keys(model.toJSON()).indexOf('baseFee') > -1;
  var totalFee = Object.keys(model.toJSON()).indexOf('totalFee') > -1;
  var needEnglishFee = Object.keys(model.toJSON()).indexOf('needEnglishFee') > -1;
  var needCartFee = Object.keys(model.toJSON()).indexOf('needCartFee') > -1;
  var removeNetFee = Object.keys(model.toJSON()).indexOf('removeNetFee') > -1;
  var price = Object.keys(model.toJSON()).indexOf('price') > -1;
  var driverName = Object.keys(model.toJSON()).indexOf('driverName') > -1;
  var driverMobile = Object.keys(model.toJSON()).indexOf('driverMobile') > -1;
  var driverLicense = Object.keys(model.toJSON()).indexOf('driverLicense') > -1;
  var ggvUuid = Object.keys(model.toJSON()).indexOf('ggvUuid') > -1;

  assert.ok(driverLicense);
  assert.ok(ggvUuid);
  assert.ok(removeNet);
  assert.ok(baseFee);
  assert.ok(totalFee);
  assert.ok(needEnglishFee);
  assert.ok(needCartFee);
  assert.ok(removeNetFee);
  assert.ok(price);
  assert.ok(driverName);
  assert.ok(driverMobile);
  assert.ok(name);
  assert.ok(mobile);
  assert.ok(bookingId);
  assert.ok(status);
  assert.ok(pickupTime);
  assert.ok(slot);
  assert.ok(districtId);
  assert.ok(territoryId);
  assert.ok(offerId);
  assert.ok(gogovanOptionId);
  assert.ok(completedAt);
  assert.ok(needEnglish);
  assert.ok(needCart);
  assert.ok(needCarry);
  assert.ok(needOver6ft);
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

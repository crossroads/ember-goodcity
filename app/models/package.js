import DS from 'ember-data';
import '../computed/foreign-key';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  quantity:        attr('number'),
  length:          attr('number'),
  width:           attr('number'),
  height:          attr('number'),
  notes:           attr('string'),
  state:           attr('string', {defaultValue:'expecting'}),
  state_event:     attr('string'),
  receivedAt:      attr('date'),
  rejectedAt:      attr('date'),
  createdAt:       attr('date'),
  updatedAt:       attr('date'),
  item:            belongsTo('item', { async: false }),
  packageType:     belongsTo('package_type', { async: false }),
  location:        belongsTo('location', { async: false }),
  favouriteImage:  belongsTo('image', { async: false }),
  offerId:         attr('number'),
  inventoryNumber: attr('string'),
  grade:           attr('string'),

  donorCondition:   belongsTo('donor_condition', { async: false }),
  donorConditionId: Ember.computed.foreignKey('donorCondition.id'),

  isReceived: Ember.computed.equal("state", "received"),

  packageName: Ember.computed('packageType', function(){
    return this.get('packageType.name');
  }),

  packageTypeId:   Ember.computed.foreignKey('packageType.id'),

  packageTypeObject: Ember.computed('packageType', function(){
    var obj = this.get('packageType').getProperties('id', 'name', 'isItemTypeNode');
    obj.id = obj.packageTypeId = parseInt(obj.id);
    return obj;
  }),

  dimensions: Ember.computed('width', 'height', 'length', function(){
    var res = '';
    var append = val => {
      if (val) { res += !res ? val : ' x ' + val; }
    }
    append(this.get('width'));
    append(this.get('height'));
    append(this.get('length'));
    return !res ? '' : res + 'cm';
  }),

  displayImageUrl: Ember.computed("favouriteImage", "item.displayImageUrl", function(){
    return this.get("favouriteImage") ? this.get("favouriteImage.thumbImageUrl") : this.get("item.displayImageUrl");
  })
});

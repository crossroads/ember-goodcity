import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Component.extend({
  attributeBindings: ['selected_id'],
  classNames: ['district-selection'],
  currentSelected: {id: null},
  selected_id: null,
  i18n: Ember.inject.service(),
  store: Ember.inject.service(),

  currentSelectedObserver: Ember.observer('currentSelected', function () {
    var selectedDistrictId = this.getWithDefault('currentSelected.id');
    if(selectedDistrictId) { this.set('selected_id', selectedDistrictId); }
  }),

  districtsByTerritory: Ember.computed({
    get: function() {
      return this.get('store').peekAll('district').sortBy('name');
    },
    set: function(key, value) {
      return value !== '' ? value : this.get('store.')peekAll('district').sortBy('name');
    }
  }),

  allTerritory: Ember.computed(function(){
    return this.get('store').peekAll('territory').sortBy('name');
  }),

  selectDistrictLabel: t("select_district"),

  actions: {
    findDistrictbyTerritory(territory) {
      var districts = territory ? territory.get('districts').sortBy('name') : '';
      this.set('districtsByTerritory', districts);
    }
  },

  didInsertElement(){
    this._super();

    Ember.run.scheduleOnce('afterRender', this, function(){
      Ember.$(".radio").click(function(){
        Ember.$(".radio").removeClass('active');
        Ember.$(this).addClass('active');
      });
    });
  }
});

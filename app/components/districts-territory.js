import $ from 'jquery';
import { scheduleOnce } from '@ember/runloop';
import { observer, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { translationMacro as t } from "ember-i18n";

export default Component.extend({
  attributeBindings: ['selected_id'],
  classNames: ['district-selection'],
  currentSelected: {id: null},
  selected_id: null,
  i18n: service(),
  store: service(),

  currentSelectedObserver: observer('currentSelected', function () {
    var selectedDistrictId = this.getWithDefault('currentSelected.id');
    if(selectedDistrictId) { this.set('selected_id', selectedDistrictId); }
  }),

  districtsByTerritory: computed({
    get: function() {
      return this.get('store').peekAll('district').sortBy('name');
    },
    set: function(key, value) {
      return value !== '' ? value : this.get('store').peekAll('district').sortBy('name');
    }
  }),

  allTerritory: computed(function(){
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

    scheduleOnce('afterRender', this, function(){
      $(".radio").click(function(){
        $(".radio").removeClass('active');
        $(this).addClass('active');
      });
    });
  }
});

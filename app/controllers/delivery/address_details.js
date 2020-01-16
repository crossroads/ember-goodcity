import { computed } from '@ember/object';
import { on } from '@ember/object/evented';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { translationMacro as t } from "ember-i18n";

export default Controller.extend({

  i18n: service(),
  delivery: alias("deliveryController.model"),
  user: alias('delivery.offer.createdBy'),
  selectedTerritory: null,
  selectedDistrict: null,

  initSelectedTerritories: on('init', function() {
    if(this.get("selectedDistrict") === null) {
      this.set("selectedTerritory", this.get("user.address.district.territory"));
      this.set("selectedDistrict", this.get("user.address.district"));
    }
  }),

  territoriesPrompt: t("all"),
  destrictPrompt: t("delivery.select_district"),

  territories: computed(function(){
    return this.store.peekAll('territory');
  }),

  districtsByTerritory: computed('selectedTerritory', function(){
    if(this.selectedTerritory && this.selectedTerritory.id) {
      return this.selectedTerritory.get('districts').sortBy('name');
    } else {
      return this.store.peekAll('district').sortBy('name');
    }
  })
});

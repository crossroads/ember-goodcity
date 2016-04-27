import config from './../config/environment';
import Ember from "ember";

export default Ember.Helper.helper(function() {
  return config.APP.GMAP_URL;
});

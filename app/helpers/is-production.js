import Ember from "ember";
import config from "../config/environment";

export default Ember.Helper.helper(function(value) {
  return config.environment === "production" && (config.staging || config.STAGING) !== true;
});

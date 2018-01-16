import Ember from "ember";
import config from "../config/environment";

export default Ember.Helper.helper(function() {
  return config.environment === "production" && (config.staging || config.STAGING) !== true;
});

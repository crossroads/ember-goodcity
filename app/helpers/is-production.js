import { helper as buildHelper } from '@ember/component/helper';
import config from "../config/environment";

export default buildHelper(function() {
  return config.environment === "production" && (config.staging || config.STAGING) !== true;
});

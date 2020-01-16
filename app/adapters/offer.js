import ApplicationAdapter from "./application";
import config from '../config/environment';


export default ApplicationAdapter.extend({

  urlForQuery: function(query, modelName){
    const { slug } = query;
    if (modelName === "offer" && slug === "search") {
      return `${config.APP.API_HOST_URL}/${config.APP.NAMESPACE}/offers/search`;
    }
    return this._super(...arguments);
  }

});

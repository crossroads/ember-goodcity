import Ember from "ember";
import config from "../config/environment";

let defaultHeaders = {
  "X-GOODCITY-APP-NAME": config.APP.NAME,
  "X-GOODCITY-APP-VERSION": config.APP.VERSION,
  "X-GOODCITY-APP-SHA": config.APP.SHA
};

function _read(data) {
  if (typeof data == "function") {
    return data();
  }
  return data;
}

function AjaxPromise(url, type, authToken, data, args, language = "en", headers = {}) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    headers = Ember.$.extend({}, _read(defaultHeaders), headers, {
      "Accept-Language": language
    });

    if (authToken) {
      headers["Authorization"] = "Bearer " + authToken;
    }

    Ember.$.ajax(
      Ember.$.extend(
        {},
        {
          type: type,
          dataType: "json",
          data: data,
          language: language,
          url: url.indexOf("http") === -1 ? config.APP.SERVER_PATH + url : url,
          headers: headers,
          success: function(data) {
            Ember.run(function() {
              resolve(data);
            });
          },
          error: function(jqXHR) {
            jqXHR.url = url;
            Ember.run(function() {
              reject(jqXHR);
            });
          }
        },
        args
      )
    );
  });
}

AjaxPromise.setDefaultHeaders = function(headers) {
  defaultHeaders = headers;
};

export default AjaxPromise;

// ---- Helpers ----

function trimmedObject(obj) {
  const trimmed = {};
  Object
    .keys(obj)
    .filter(key => obj[key] !== undefined)
    .forEach(key => trimmed[key] = obj[key]);
  return trimmed;
}

/**
 * Chainable ajax request builder
 *
 * Usage:
 *    AjaxBuilder('/offers')
 *      .withData({ some: 'data' })
 *      .post();
 *
 * @class Builder
 */
class Builder {
  constructor(url) {
    this.url = url;
    this.data = {};
    this.query = {};
    this.headers = Ember.$.extend({}, defaultHeaders);
    this.lang = "en";
  }

  withBody(data) {
    this.data = data;
    return this;
  }

  withQuery(query) {
    this.query = trimmedObject(query);
    return this;
  }

  withHeader(key, value) {
    this.headers[key] = value;
    return this;
  }

  withAuth(token) {
    return this.withHeader("Authorization", `Bearer ${token}`);
  }

  withLang(lang) {
    this.lang = lang;
    return this;
  }

  do(method) {
    const qstr = Object.keys(this.query)
      .map(k => `${k}=${this.query[k]}`)
      .join('&');

    const sep = /\?/.test(this.url) ? '&' : '?';
    const url = qstr.length ? `${this.url}${sep}${qstr}` : this.url;
    return AjaxPromise(url, method, null, this.data, {}, this.lang, this.headers);
  }

  getPage(page, perPage = 25) {
    this.query['page'] = page;
    this.query['per_page'] = perPage;
    return this.get();
  }

  get() {
    return this.do("GET");
  }

  post() {
    return this.do("POST");
  }

  put() {
    return this.do("PUT");
  }

  delete() {
    return this.do("DELETE");
  }
}

export function AjaxBuilder(url) {
  return new Builder(url);
};
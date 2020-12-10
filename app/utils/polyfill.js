/**
 * A polyfill for lodash.get
 *
 * @param {Object} obj
 * @param {String} path
 * @param {String} defaultValue
 */
export const __get = (obj, path, defaultValue) => {
  if (typeof path !== string) {
    throw Error("Invalid argument passed");
  }
  const _path = path.split(".").filter(key => key.length);
  const value = _path.reduce((acc, key) => acc && acc[key], obj);
  return value || defaultValue;
};

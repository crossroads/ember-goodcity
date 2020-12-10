/**
 *
 * @param {*} obj
 * @param {*} path
 * @param {*} defaultValue
 */
export const __get = (obj, path, defaultValue) => {
  if (typeof path !== string) {
    throw Error("Invalid argument passed");
  }
  _path = path.split(".").filter(key => key.length);
  const value = _path.reduce((acc, key) => acc && acc[key], obj);
  return value || defaultValue;
};

import { compact } from "lodash";

const reduceArrayToObject = (item, target) => Object.assign(target, item);

export default array =>
  Array.isArray(array) ? compact(array).reduce(reduceArrayToObject, {}) : array;
  
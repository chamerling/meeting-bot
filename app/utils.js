/**
 *
 * @param str
 * @param start
 * @param i
 * @returns {boolean}
 */
module.exports.startsWith = function(str, start, i) {
  return str.substr(i || 0, start.length) === start;
}
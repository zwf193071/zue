/**
 * Check for selectors
 *
 * @param {String|Element} el
 */
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
function query (el) {
    return typeof el === 'string' ? document.querySelector(el) : el;
}
function extend (to, from) {
    var keys = Object.keys(from)
    var i = keys.length
    while (i--) {
      to[keys[i]] = from[keys[i]]
    }
    return to
}
function toArray (list, start) {
    start = start || 0
    var i = list.length - start
    var ret = new Array(i)
    while (i--) {
      ret[i] = list[i + start]
    }
    return ret
}
/**
 * Escape a string so it can be used in a RegExp
 * constructor.
 *
 * @param {String} str
 */

function escapeRegex(str) {
  return str.replace(regexEscapeRE, '\\$&');
}
function replace(target, el) {
  var parent = target.parentNode;
  if (parent) {
    parent.replaceChild(el, target);
  }
}
function isTextNode (node) {
  return node.nodeType == 3;
}
function isElementNode (node) {
  return node.nodeType == 1;
}
export {   
    extend,
    query,
    toArray,
    escapeRegex,
    replace,
    isTextNode,
    isElementNode
}
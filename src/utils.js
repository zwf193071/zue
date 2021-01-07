/**
 * Check for selectors
 *
 * @param {String|Element} el
 */

function query(el) {
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
  
export {   
    extend,
    query,
    toArray
}
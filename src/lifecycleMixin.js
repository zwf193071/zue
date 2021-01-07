export default function lifecycleMixin(Zue) {
  Zue.prototype._compile = function (el) {
    var vm = this;
    el.childNodes.forEach(node => {
      if (node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)) {
        node.textContent = vm[RegExp.$1]
      }
    });
  }
}
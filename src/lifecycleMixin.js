import { 
  toArray,
  isElementNode,
  isTextNode
} from './utils.js'
export default function lifecycleMixin(Zue) {
  Zue.prototype._compile = function (el) {
    var vm = this;
    var childNodes = toArray(el.childNodes);
    childNodes.forEach(node => {
      var text = node.textContent;
      var reg = /\{\{(.*)\}\}/;
      if (isElementNode(node)) {
        
      } else if (isTextNode(node) && reg.test(text)) {
        vm.compileText(node, RegExp.$1.trim());
      }
      if (node.childNodes && node.childNodes.length) {
        vm._compile(node);
      }
    });

  }
  Zue.prototype.compileText = function (node, exp) {
    node.textContent = this[exp]
  }
}
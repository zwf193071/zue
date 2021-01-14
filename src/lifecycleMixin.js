import { 
  toArray,
  isElementNode,
  isTextNode
} from './utils.js'
function compileTextNode(node, vm) {
  const reg = /\{\{(.+?)\}\}/g;;
  let txt = node.wholeText;
  txt = txt.replace(reg, (_, gl) => {
    let key = gl.trim();
    let value = vm[key];
    return value;
  });
  node.textContent = txt;
}
export default function lifecycleMixin(Zue) {
  Zue.prototype._compile = function (el) {
    const vm = this;
    const childNodes = toArray(el.childNodes);
    childNodes.forEach(node => {
      const text = node.textContent;
      
      if (isElementNode(node)) {
        
      } else if (isTextNode(node)) {
        compileTextNode(node, this);
      }
      if (node.childNodes && node.childNodes.length) {
        vm._compile(node);
      }
    });
  }
}
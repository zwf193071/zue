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
function compileNode(frag, vm) {
  const childNodes = toArray(frag.childNodes);
  childNodes.forEach(node => {
    
    if (isElementNode(node)) {
      
    } else if (isTextNode(node)) {
      compileTextNode(node, vm);
    }
    if (node.childNodes && node.childNodes.length) {
      vm._compile(node);
    }
  });
}
function node2Fragment(el) {
  let fragment = document.createDocumentFragment(), child;

  // 将原生节点拷贝到fragment
  while (child = el.firstChild) {
    fragment.appendChild(child);
  }
  return fragment;
}
export default function lifecycleMixin(Zue) {
  Zue.prototype._compile = function (el) {
    const frag = node2Fragment(el);
    compileNode(frag, this);
    el.appendChild(frag);
  }
}
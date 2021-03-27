import { Watcher } from './Observer.js'
export const CompileTool = {
    text(node, exp, vm) {
        let value;
        if (exp.indexOf('{{') !== -1) {
            value = exp.replace(/\{\{(.+?)\}\}/g, (...args) => {
                new Watcher(vm, args[1], () => {
                    Updater.updateText(node, this.getContentVal(exp, vm))
                })
                return this.getVal(args[1], vm)
            })
        } else {
            value = this.getVal(exp, vm)
        }
        // new Watcher(vm, exp, (newVal) => {
        //     Updater.updateText(node, newVal)
        // })
        Updater.updateText(node, value)
    },
    html(node, exp, vm) {
        const value = this.getVal(exp, vm)
        new Watcher(vm, exp, (newVal) => {
            Updater.updateHtml(node, newVal)
        })
        Updater.updateHtml(node, value)
    },
    model(node, exp, vm) {
        const value = this.getVal(exp, vm)
        new Watcher(vm, exp, (newVal) => {
            Updater.updateModel(node, newVal)
        })
        Updater.updateModel(node, value)
    },
    if(node, exp, vm) {
        const value = this.getVal(exp, vm)
        Updater.updateIf(node, value)
    },
    getContentVal(exp, vm) {
        return exp.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(args[1], vm)
        })
    },
    getVal(exp, vm) {
        return exp.split('.').reduce((data, curVal) => {
            return data[curVal]
        }, vm.$data)
    },
    on(node, exp, vm, eventName) {
        let fn = vm.$options.methods && vm.$options.methods[exp]
        node.addEventListener(eventName, fn.bind(vm))
    }
}
const Updater = {
    updateModel(node, val) {
        node.setAttribute('value', val)
        node.value = val
    },
    updateText(node, val) {
        node.textContent = val
    },
    updateHtml(node, val) {
        node.innerHTML = val
    },
    updateIf(node, val) {
        if (!val) node.remove()
    }
}
export default class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm
        const fragment = this.nodeToFragment(this.el)
        this.init(fragment)
        this.el.appendChild(fragment)
    }  
    init(el) {
        const childNodes = this.toArray(el.childNodes)
        childNodes.forEach(child => {
            if (this.isElementNode(child)) {
                this.compileElement(child)
            } else if (this.isTextNode(child)) {
                this.compileText(child)
            }
            if (child.childNodes && child.childNodes.length) this.init(child)
        })
    }
    // 将节点转成fragment，减少回流和重绘
    nodeToFragment(el) {
        const f = document.createDocumentFragment()
        let firstChild;
        while (firstChild = el.firstChild) {
            f.appendChild(firstChild)
        }
        return f
    }
    compileElement(el) {
        const attrs = this.toArray(el.attributes)
        attrs.forEach(attr => {
            const { name, value } = attr
            if (this.isDirective(name)){
                const [,type] = name.split('-')         
                if (this.isEventType(type)) {
                    const [,eventName] = type.split(':')
                    CompileTool['on'](el, value, this.vm, eventName)
                } else {
                    CompileTool[type](el, value, this.vm)
                }
                el.removeAttribute(name)
            }
        })
    }
    isDirective(str) {
        return str.startsWith('v-')
    }
    toArray(arrayLike) {
        return Array.prototype.slice.call(arrayLike)
    }
    compileText(el) {
        const content = el.textContent
        if (/\{\{(.+?)\}\}/.test(content)) {
            CompileTool['text'](el, content, this.vm)
        }
    }
    isEventType(type) {
        return type.startsWith('on:')
    }
    isElementNode(node) {
        return node.nodeType === 1
    }
    isTextNode(node) {
        return node.nodeType === 3
    }
}
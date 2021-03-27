import { CompileTool } from './Compile.js'
export class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm
        this.exp = exp
        this.cb = cb
        this.oldVal = this.getOldVal()
    }
    getOldVal() {
        Dep.target = this
        const oldVal = CompileTool.getVal(this.exp, this.vm)
        Dep.target = null
        return oldVal
    }
    update() {
        const newVal = CompileTool.getVal(this.exp, this.vm)
        if (newVal !== this.oldVal) {
            this.cb(newVal)
        }
    }
}
class Dep {
    constructor() {
        this.subs = []
    }
    // 收集观察者
    addSub(wather) {
        this.subs.push(wather)
    }
    // 通知观察者更新
    notify() {
        this.subs.forEach(a => a.update())
    }
}
export default class Observer {
    constructor(data) {
        this.observe(data)
    }
    observe(data) {
        if (typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.reactive(data, key, data[key])
            })
        }
    }
    reactive(obj, key, value) {
        this.observe(value)
        const dep = new Dep()
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: false,
            get() {
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set: (newVal) => {
                this.observe(newVal)
                if (newVal !== value) {
                    value = newVal
                }
                dep.notify()
            }
        })
    }
}
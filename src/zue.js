
import Observer from './Observer.js'
import Compile from './Compile.js'
export default class Zue {
    constructor (options) {
        this.init(options);
    }

    init(options) {
        if (!options.el) {
            console.warn('el is required')
            return
        }
        if (typeof options.data !== 'function') {
            console.warn('data must be function')
            return
        }
        this.$el = options.el;
        this.$options = options;
        this.$data = options.data()
        new Observer(this.$data)
        new Compile(this.$el, this)
    }
}

Zue.version = '0.0.1';



import {
    query,
    isElementNode
} from './utils.js';
import stateMixin from './stateMixin.js';
import lifecycleMixin from './lifecycleMixin.js';

export default class Zue {
    constructor (options) {
        this.init(options);
    }

    init(options) {
        const el = isElementNode(options.el) ? el : query(options.el);
        this.$options = options;
        this._initState();
        this._compile(el);
    }
}

stateMixin(Zue);
lifecycleMixin(Zue);
Zue.version = '0.0.1';



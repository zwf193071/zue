export default function stateMixin(Zue) {
    Object.defineProperty(Zue.prototype, '$data', {
        get () {
            return this._data;
        },
        set (newData) {
            if (newData !== this._data) {
                // this._setData(newData);
            }
        }
    });
    
    Zue.prototype._initState = function () {
        this._initData();
    }

    Zue.prototype._initData = function () {
        var dataFn = this.$options.data;
        var data = this._data = dataFn ? ( typeof dataFn == 'function' ? dataFn() : dataFn ) : {}
        // proxy data on instance
        var keys = Object.keys(data);
        var i, key;
        i = keys.length;
        while (i--) {
            key = keys[i];
            this._proxy(key);
        }
    }
    Zue.prototype._proxy = function (key) {
        var self = this;
        Object.defineProperty(self, key, {
            configurable: true,
            enumerable: true,
            get: function proxyGetter() {
                return self._data[key];
            },
            set: function proxySetter(val) {
                self._data[key] = val;
            }
        });
    }
}
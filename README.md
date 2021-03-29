# Zue

## What is this?

Zue is a simple MVVM tool, which derives from Vue. It aims to help everyone to understand the principles of Vue in a more simpler way.


## Example
```
    <div id="app">
        <p>This is {{msg}}</p>
        <p v-text="text"></p>
        <p v-text="parent.father"></p>
        <div v-html="htmlStr"></div>
        <input type="text" v-model="msg"/>
        <p>父亲：{{parent.father}}，母亲：{{parent.mother}}  <span>儿子：{{children.son}}，女儿：{{children.daughter}}</span></p>
        <p v-if="showChild">showChild</p>
        <button v-on:click="clickMe">clickMe</button>
    </div>
    
    <script type="module">
        import Zue from './src/zue.js'

        window.vm = new Zue({
            el: '#app',
            data() {
                return {
                    msg: 'test',
                    text: "lucy",
                    parent: {
                        father: 'kai',
                        mother: 'fang'
                    },
                    children: {
                        son: 'yu',
                        daughter: 'xi'
                    },
                    htmlStr: '<span>只是个测试</span>',
                    showChild: true
                }
            },
            methods: {
                clickMe() {
                    this.msg = "learn vue"
                    this.htmlStr = '测试发生了改变'
                }
            }
        })
    </script>
```

## Build Setup

``` bash
npm install

npm start

```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

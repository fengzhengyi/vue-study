function defineReactive (obj, key, val) {
    observe(val)
    Object.defineProperty(obj, key, {
        get () {
            console.log('get ' + key)
            return val
        },
        set (newVal) {
            if (newVal !== val) {
                console.log('set ' + key)
                //处理新值也是对象的情况
                observe(newVal)
                val = newVal

                //update(val)
            }

        }
    })
}

function observe (obj) {
    if (typeof obj !== 'object' || obj === null) {
        return
    }
    new Observer(obj)
}
//执行数据响应化
class Observer {
    constructor(obj) {
        if (Array.isArray(obj)) {
            //todo 数组的响应式
        } else {
            Object.keys(obj).forEach(key => {
                defineReactive(obj, key, obj[key])
            })
        }
    }
}
/**
 * 编辑模版，初始化视图，收集依赖
 */
class Complie {
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)
        if (this.$el) {
            this.complie(this.$el)
        }
    }
    complie (el) {
        //对el的DOM做递归遍历，
        el.childNodes.forEach(node => {
            if (node.nodeType === 1) {
                console.log('元素节点')
                this.complieElement(node)
                if (node.childNodes.length) {
                    this.complie(node)
                }
            }
            if (this.isInter(node)) {
                console.log('插值绑定')
                this.complieText(node)
            }
        })
    }
    isInter (node) {
        return node?.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    complieText (node) {
        console.log(RegExp.$1)
        node.textContent = this.$vm[RegExp.$1]
    }
    complieElement (node) {
        let nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            console.log(attr)
            const attrName = attr.name
            const exp = attr.value
            if (this.isEvent(attrName)) {
                const event = attrName.substring(5)
                node.addEventListener(event, () => {
                    this.$vm.$option.methods[exp]()
                })
            } else if (this.isDir(attrName)) {
                //k-text="counter"
                const dir = attrName.substring(2)
                this[dir] && this[dir](node, exp)
            }
        })
    }
    isDir (name) {
        return name.startsWith('k-')
    }
    isEvent (name) {
        return name.startsWith('k-on:')
    }
    //k-text
    text (node, exp) {
        node.innerText = this.$vm[exp]
    }
    //k-html
    html (node, exp) {
        node.innerHTML = this.$vm[exp]
    }
    //k-model
    model (node, exp) {
        node.value = this.$vm[exp]
        const kvue = this.$vm
        node.addEventListener('input', function (event) {
            kvue[exp] = this.value
        })
    }
}

// eslint-disable-next-line no-unused-vars
class KVue {
    constructor(options) {
        //1.保存配置
        this.$option = options
        //2.对data做响应式
        this.$data = options.data
        observe(this.$data)
        //2.5$data的代理
        this.proxy(options.data)

        //3.编辑视图模版
        new Complie(options.el, this)
    }
    /**
     * data的代理
     * @param {object} data
     */
    proxy (data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get () {
                    return data[key]
                },
                set (newVal) {
                    data[key] = newVal
                }
            })
        })
    }
}

//export default KVue


function defineReactive (obj, key, val) {
    observe(val)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        get () {
            console.log('get ' + key)
            //添加依赖
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set (newVal) {
            if (newVal !== val) {
                console.log('set ' + key)
                //处理新值也是对象的情况
                observe(newVal)
                val = newVal
                dep.notify()
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
    update (node, exp, dir) {
        //1.初始化
        const fn = this[dir + 'Updater']
        fn && fn(node, this.$vm[exp])
        //2.生成Watcher
        new Watcher(this.$vm, exp, (val) => {
            fn && fn(node, val)
        })
    }
    complieText (node) {
        console.log(RegExp.$1)
        this.update(node, RegExp.$1, 'text')
    }
    complieElement (node) {
        let nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            console.log(attr)
            const attrName = attr.name
            const exp = attr.value
            if (this.isEvent(attrName)) {
                const event = attrName.substring(5)
                const fn = this.$vm.$option.methods[exp]
                node.addEventListener(event, fn.bind(this.$vm))
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
        this.update(node, exp, 'text')
    }
    textUpdater (node, val) {
        node.textContent = val
    }
    //k-html
    html (node, exp) {
        this.update(node, exp, 'html')
    }
    htmlUpdater (node, val) {
        node.innerHTML = val
    }
    //k-model
    model (node, exp) {
        this.update(node, exp, 'model')
        const kvue = this.$vm
        node.addEventListener('input', function (e) {
            kvue[exp] = e.target.value
        })
    }
    modelUpdater (node, val) {
        node.value = val
    }
}
//负责试图中依赖的更新
class Watcher {
    constructor(vm, key, updater) {
        this.vm = vm
        this.key = key
        this.updater = updater
        //尝试触发key,实现依赖收集
        Dep.target = this
        this.vm[key]
        Dep.target = null
    }
    update () {
        this.updater.call(this.vm, this.vm[this.key])
    }
}

//Dep，和data中的每个key一一对应，在响应式处理函数中，每遍历一个属性，就创建一个对应的Dep
class Dep {
    constructor() {
        this.deps = []
    }
    addDep (watcher) {
        this.deps.push(watcher)
    }
    notify () {
        this.deps.forEach(watcher => watcher.update())
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

let Vue;

class Store {
  constructor(options) {
    this._mutations = options.mutations
    this._actions = options.actions
    this._getters = options.getters

    const computed = {}
    this.getters = {}
    const store = this
    Object.keys(this._getters).forEach(key => {
      //获取用户定义的getters
      const fn = store._getters[key]
      //转换成
      computed[key] = function () {
        return fn(store.state)
      }
      Object.defineProperty(this.getters, key, {
        get: () => store._vm[key]
      })
    })

    //Vue.util.defineReactive(this, 'state',options.state)
    this._vm = new Vue({
      data: { $$store: options.state },
      computed //使用计算属性做数据缓存
    })
    //绑定this
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  get state () {
    return this._vm.$data.$$store
  }
  set state (v) {
    console.error('不能直接修改state')
  }
  // /**
  //  * 给出一个方法依赖动态state,并执行options.getters的方法
  //  * @param {object} state 
  //  */
  // __getters () {
  //   let getters = {}
  //   //实现$store.getters.type的调用时，实际是执行options.getters.type()这个方法
  //   for (const getter in this._getters) {
  //     if (Object.hasOwnProperty.call(this._getters, getter)) {
  //       getters[getter] = this._getters[getter](this.state);
  //     }
  //   }
  //   return getters
  // }
  // get getters () {
  //   return this.__getters()
  // }
  commit (type, payload) {
    // if (this.mutations[type]) {
    //   this.mutations[type](this.state)
    // }
    const entry = this._mutations[type]
    if (!entry) {
      console.error('未知的mutations方法')
      return
    }
    entry(this.state, payload)
  }
  dispatch (type, payload) {
    const entry = this._actions[type]
    if (!entry) {
      console.error('未知的actions方法')
      return
    }
    entry(this, payload)
  }
}

//实现插件的install
const install = function (_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })

}

export default { Store, install }
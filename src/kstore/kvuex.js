let Vue;

class Store {
  constructor(options) {
    if (options.state) {
      Vue.util.defineReactive(this, 'state',options.state)
    }
    const { getters, mutations, actions, modules } = options
    Object.assign(this, { getters, mutations, actions, modules })
  }
  commit (mutation) {
    if (this.mutations[mutation]) {
      this.mutations[mutation](this.state)
    }
  }
  dispatch () { }
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
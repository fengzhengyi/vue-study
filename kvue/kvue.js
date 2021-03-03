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
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}


class KVue {
  constructor(options) {
    this.$options = options
  }
}

export default KVue
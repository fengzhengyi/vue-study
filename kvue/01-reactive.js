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
// function update (val) {
//   //document.querySelector('.app').innerText = val
// }
function set (obj, key, val) {
  defineReactive(obj, key, val)
}
function observe (obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

const obj = {
  foo: 'foo',
  bar: 'bar',
  baz: { a: 1 }
}
observe(obj)
// obj.foo
// obj.bar
// obj.baz.a
// obj.baz = { a: 10 }
// obj.baz.a
set(obj,'dong','dong')
obj.dong
export default {
<<<<<<< HEAD
    render (h) {
        //通过当前的hash值，找到routes中的和hash匹配的对象的component
        let comp = null
        const route = this.$router.$options.routes.find(
            route => route.path === this.$router.current)
        if (route) {
            comp = route.component
        }
        return h(comp)
    }
=======
  render (h) {
    //通过当前的hash值，找到routes中的和hash匹配的对象的component
    let comp = null
    const route = this.$router.$options.routes.find(
      route => route.path === this.$router.current)
    if (route) {
      comp = route.component
    }
    return h(comp)
  }
>>>>>>> 4911d9d96e2526b9b0c0c142a294e7ee11ea0e19
}
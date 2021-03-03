import Link from "./krouter-link";
import View from "./krouter-view";
let Vue = null;
//定义插件类
class VueRouter {
  constructor(options) {
    //1.解析routes选项
    this.$options = options
    //2.监控hash的变化
    //创建一个响应式属性current存储当前hash,
    Vue.util.defineReactive(this, 'current', '/')
    window.addEventListener('hashchange', () => {
      //截取#后面的部分
      this.current = window.location.hash.slice(1)
    })
    //3.响应hash的变化
  }
}
//VueRouter是一个插件，必须实现install方法
//传入Vue构造函数，就不用import Vue,打包成独立插件时，避免把vue打包进去
VueRouter.install = function (_Vue) {
  Vue = _Vue;

  //使用vue的混入，挂载$router
  Vue.mixin({
    beforeCreate () {
      //仅仅在vue实例化的时候执行一次
      if (this.$options.router) {
        //挂载到vue根对象上，所有vue组件都可通过this.$router访问路由器实例
        Vue.prototype.$router = this.$options.router
      }
    }
  });

  //声明router-link, router-view组件
  Vue.component('router-link', Link)
  Vue.component('router-view', View)
};

export default VueRouter;
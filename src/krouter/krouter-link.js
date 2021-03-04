export default {
<<<<<<< HEAD
    props: {
        to: {
            type: String,
            require: true
        }
    },
    render (h) {
        return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
    }
=======
  props: {
    to: {
      type: String,
      require: true
    }
  },
  render (h) {
    return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
  }
>>>>>>> 4911d9d96e2526b9b0c0c142a294e7ee11ea0e19
}
<template>
  <div>
    <h1>about</h1>
    <div @click="$store.commit('add')">{{$store.state.counter}}</div>
    <div @click="$store.dispatch('add')">async:{{$store.state.counter}}</div>
    <div >{{$store.getters.doubleCounter}}</div>
  </div>

</template>

<script>
export default {
  name: 'About'
}
</script>

<style>
</style>
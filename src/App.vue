<template>
  <div id="app">
    <nav style="padding-bottom:20px;">
      <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link>
    </nav>
    <div @click="$store.commit('add')">{{$store.state.counter}}</div>
    <div @click="$store.dispatch('add')">async:{{$store.state.counter}}</div>
    <div>getters.doubleCounter:{{$store.getters.doubleCounter}}</div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

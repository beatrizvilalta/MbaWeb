<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <UserDetail :userId="1"/>
  </div>
</template>

<script>
import UserDetail from './components/UserDetail.vue'

export default {
  name: 'App',
  components: {
    UserDetail
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

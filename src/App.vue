<template>
  <div id="app">
    <home/>
  </div>
</template>

<script>
import home from './components/home.vue';

export default {
  name: 'app',
  components: {
    home,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
</style>

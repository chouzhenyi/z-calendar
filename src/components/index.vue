<template>
  <div class="index-wrapper">
    <input type="text" class="username" v-model="name">
    <input type="button" value="点击" class="commit" @click="commit">
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    };
  },
  methods: {
    commit() {
      console.log(this.name);
    }
  }
};
</script>

<style>
</style>
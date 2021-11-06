<template>
  <div class="app">
    <TravelList />
  </div>
</template>

<script>
  import TravelList from '@/components/TravelList';
  export default {
    components: { TravelList },
  };
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

<template>
  <div class="navbar">
    <router-link :to="{ name: 'Home' }">Travel list</router-link>
    <router-link :to="{ name: 'AddTravel' }">Add travel</router-link>
  </div>
</template>

<script>
  export default {};
</script>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 500px;
    margin: 0 auto;
  }

  .navbar a {
    list-style: none;
    text-decoration: none;
    color: #888;
    font-size: 20px;
  }

  a.router-link-active {
    color: #555;
    border-bottom: 1px solid #555;
    padding-bottom: 5px;
    transform: scale(1.1);
  }
</style>

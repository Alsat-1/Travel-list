<template>
  <div>
    <li class="travel__item" v-for="travel in filteredTravels" :key="travel.id">
      <h3 class="travel__item_title">{{ travel.title }}</h3>
      <p class="travel__item_price">Price - {{ travel.price }}</p>
    </li>
  </div>
</template>

<script>
  export default {};
</script>

<style></style>

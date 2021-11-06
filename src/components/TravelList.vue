<template>
  <div class="travels">
    <h2>Travel list</h2>
    <div class="travels__cities" v-for="trip in trips" :key="trip.price" v-show="trips.length">
      <h3 class="travels__cities_title">{{ trip.title }}</h3>
      <p class="travels__cities_price">Price - {{ trip.price }}</p>
    </div>
    <div class="error" v-show="error">{{ error }}</div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    computed: {
      ...mapState(['trips', 'error']),
    },
    methods: {
      ...mapActions(['getTripsArray']),
    },
    mounted() {
      this.getTripsArray();
    },
  };
</script>

<style>
  .error {
    color: red;
    font-size: 18px;
  }
</style>

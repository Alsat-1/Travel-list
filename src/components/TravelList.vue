<template>
  <div class="travels">
    <h2 class="travel__title">Travel list</h2>
    <ul class="travel__list" v-if="travels.length">
      <li class="travel__item" v-for="travel in travels" :key="travel.id">
        <h3 class="travel__item_title">{{ travel.title }}</h3>
        <p class="travel__item_price">Price - {{ travel.price }}</p>
      </li>
      <div class="travel__filters">
        <button class="travel__filters_btn" @click="EUTravels">EU travels</button>
        <button class="travel__filters_btn" @click="AllTravels">All travels</button>
      </div>
    </ul>
    <div class="error" v-else>{{ error }}</div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    computed: {
      ...mapState(['travels', 'error']),
    },
    methods: {
      ...mapActions(['getTravelsArray']),

      EUTravels() {
        this.$store.commit('setUrl', 'http://localhost:3000/travels?location=europe');
        this.$store.dispatch('getTravelsArray');
      },
      AllTravels() {
        this.$store.commit('setUrl', 'http://localhost:3000/travels');
        this.$store.dispatch('getTravelsArray');
      },
    },
    mounted() {
      this.getTravelsArray();
    },
  };
</script>

<style>
  .travels {
    width: 480px;
    margin: 60px auto;
  }

  .travel__title {
    font-size: 26px;
  }

  .travel__list {
    padding: 0;
  }

  .travel__item {
    border: 1px solid #e4e4e4;
    box-sizing: border-box;
    padding: 10px;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    list-style-type: none;
    margin: 20px 0;
  }

  .travel__filters {
    display: flex;
    gap: 10px;
  }

  .travel__filters_btn {
    padding: 10px;
    font-size: 16px;
    flex-grow: 1;
    cursor: pointer;
  }

  .error {
    color: red;
    font-size: 18px;
  }
</style>

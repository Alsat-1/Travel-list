<template>
  <div class="travels">
    <h2 class="travel__title">Travel list</h2>
    <Spinner v-if="isLoading && !error" />
    <Search :searchValue="searchValue" @update-search="updateSearch" v-model="searchValue" />
    <div class="travel__search_empty" v-if="!filteredTravels.length && !error && !isLoading">
      Search list is empty
    </div>
    <div class="travel__filters">
      <Button
        @click="EUTravels"
        :class="{ active__item: url === 'http://localhost:3000/travels?location=europe' }"
      >
        EU travels
      </Button>
      <Button
        @click="AllTravels"
        :class="{ active__item: url === 'http://localhost:3000/travels' }"
      >
        All travels
      </Button>
      <Button @click="addTravel">Add travel</Button>
    </div>
    <ul class="travel__list" v-show="travels.length">
      <li class="travel__item" v-for="travel in filteredTravels" :key="travel.id">
        <div class="travel__item__header">
          <h3 class="travel__item_title">{{ travel.title }}</h3>
          <div class="travel__item_icons">
            <router-link :to="{ name: 'EditTravel', params: { id: travel.id } }">
              <span class="material-icons" title="Edit travel"> edit </span>
            </router-link>
            <span class="material-icons" title="Delete travel" @click="deleteTravel(travel.id)">
              delete
            </span>
          </div>
        </div>
        <p class="travel__item_price">Price - {{ travel.price }}</p>
      </li>
    </ul>
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex';
  import Search from '@/components/Search.vue';
  import Spinner from '@/components/Spinner.vue';
  import Button from '@/components/Button.vue';

  export default {
    components: { Spinner, Search, Button },
    data() {
      return {
        searchValue: '',
      };
    },
    computed: {
      ...mapState(['travels', 'error', 'isLoading', 'search', 'url']),
      ...mapGetters(['filteredTravels']),
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
      updateSearch() {
        this.$store.commit('setSearch', this.searchValue);
      },
      addTravel() {
        this.$router.push({ name: 'AddTravel' });
      },
      deleteTravel(id) {
        const _id = this.travels.filter((travel) => id == travel.id).find((trip) => trip.id).id;
        const url = `${this.url}/${_id}`;

        this.$store.dispatch('deleteTravel', url);
      },
    },
    mounted() {
      this.getTravelsArray();
    },
  };
</script>

<style scoped>
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

  .travel__search {
    width: 480px;
    padding: 5px 10px;
    box-sizing: border-box;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
  }

  .travel__search_empty,
  .error {
    margin-top: 15px;
    color: red;
    font-size: 18px;
    text-transform: capitalize;
  }

  .travel__item {
    border: 1px solid #e4e4e4;
    box-sizing: border-box;
    padding: 10px;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.35);
    border-radius: 4px;
    list-style-type: none;
    margin: 20px 0;
  }

  .travel__item__header {
    position: relative;
  }

  .travel__item_icons {
    position: absolute;
    top: -15%;
    left: 85%;
  }

  .travel__filters {
    display: flex;
    gap: 10px;
    margin: 15px 0;
  }

  .material-icons {
    font-size: 24px;
    margin-left: 10px;
    color: #bbb;
    cursor: pointer;
  }

  .material-icons:hover {
    color: #777;
  }

  .active__item {
    background: #777;
    border: 1px solid black;
    border-radius: 3px;
    color: #eee;
  }

  /* .travel__filters_btn {
    padding: 10px;
    font-size: 16px;
    flex-grow: 1;
    cursor: pointer;
  } */
</style>

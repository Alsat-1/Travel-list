<template>
  <div class="travels">
    <h2 class="travel__title">Travels</h2>
    <Spinner v-if="isLoading && !error" />
    <Search :searchValue="searchValue" @update-search="updateSearch" v-model="searchValue" />
    <div class="travel__search_empty" v-if="!filteredTravels.length && !error && !isLoading">
      By request {{ search }} nothing found
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
    </div>
    <ul class="travel__list" v-show="travels.length">
      <transition-group name="fade">
        <li class="travel__item" v-for="travel in filteredTravels" :key="travel.id">
          <SingleTravel :travel="travel" @delete-travel="deleteTravel" />
        </li>
      </transition-group>
    </ul>
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex';
  import Search from '@/components/Search.vue';
  import Spinner from '@/components/Spinner.vue';
  import Button from '@/components/Button.vue';
  import SingleTravel from '@/components/SingleTravel.vue';

  export default {
    components: { Spinner, Search, Button, SingleTravel },
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
        const _id = this.travels.filter((travel) => id === travel.id).find((trip) => trip.id).id;
        const url = `${this.url}/${_id}`;
        if (this.url.includes('europe')) {
          const _url = `${this.url.slice(0, 29)}/${_id}?location=europe`;
          this.$store.dispatch('deleteTravel', _url);
        } else {
          this.$store.dispatch('deleteTravel', url);
        }
      },
    },
    mounted() {
      this.getTravelsArray();
    },
  };
</script>

<style scoped>
  .travels {
    width: 500px;
    margin: 25px auto;
  }

  .travel__title {
    font-size: 26px;
  }

  .travel__list {
    padding: 0;
  }

  .travel__search_empty,
  .error {
    margin-top: 15px;
    color: red;
    font-size: 20px;
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

  .travel__filters {
    display: flex;
    gap: 10px;
    margin: 15px 0;
  }

  .active__item {
    background: #777;
    border: 1px solid black;
    border-radius: 3px;
    color: #eee;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    transform: translateX(100px);
    opacity: 0;
  }
</style>

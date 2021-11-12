<template>
  <div class="singleTravel__wrapper">
    <div class="singleTravel">
      <h3 class="singleTravel__title">{{ travel.title }}</h3>
      <div class="singleTravel__icons">
        <router-link :to="{ name: 'EditTravel', params: { id: travel.id } }">
          <span class="material-icons" title="Edit travel"> edit </span>
        </router-link>
        <span
          class="material-icons"
          title="Delete travel"
          @click="$emit('deleteTravel', travel.id)"
        >
          delete
        </span>
      </div>
    </div>
    <p class="singleTravel__price">Price - {{ travel.price }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      travel: {
        type: Object,
        required: true,
      },
    },
    emits: ['deleteTravel'],
  };
</script>

<style scoped>
  .singleTravel {
    position: relative;
  }

  .singleTravel__icons {
    position: absolute;
    top: -15%;
    left: 85%;
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

  .singleTravel__price {
    color: #999;
    font-weight: bold;
    font-size: 16px;
  }
</style>

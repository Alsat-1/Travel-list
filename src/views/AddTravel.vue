<template>
  <div class="add__travel">
    <h2>Add new travel</h2>
    <form class="form" @submit.prevent="handleSubmit">
      <input type="text" class="form__title" placeholder="Travel title" v-model="title" required />
      <input
        type="number"
        class="form__price"
        placeholder="Enter price in $"
        v-model.number="price"
        required
      />
      <input
        type="text"
        class="form__price"
        placeholder="Location like Europe, America, etc"
        v-model="location"
      />
      <Button>Add travel</Button>
    </form>
  </div>
</template>

<script>
  import Button from '@/components/Button.vue';

  export default {
    components: { Button },
    data() {
      return {
        title: '',
        price: null,
        location: '',
      };
    },
    methods: {
      handleSubmit() {
        const newTravel = {
          title: this.title,
          price: `$${this.price}`,
          location: this.location.toLowerCase() || 'not pointed',
        };

        this.$store.dispatch('addNewTravel', newTravel);
        this.$router.push({ name: 'Home' });
      },
    },
  };
</script>

<style scoped>
  .form {
    width: 480px;
    margin: 30px auto;
  }
  .form input {
    width: 400px;
    box-sizing: border-box;
    padding: 7px 10px;
    margin-bottom: 15px;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
  }
</style>

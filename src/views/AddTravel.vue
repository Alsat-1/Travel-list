<template>
  <div class="add__travel">
    <Form @handle-submit="handleSubmit">
      <template #title>
        <h2>Add new travel</h2>
      </template>
      <input type="text" placeholder="Travel title" v-model="title" required />
      <input type="number" placeholder="Enter price in $" v-model.number="price" required />
      <input type="text" placeholder="Location like Europe, America, etc" v-model="location" />
      <Button>Add travel</Button>
    </Form>
  </div>
</template>

<script>
  import Button from '@/components/Button.vue';
  import Form from '@/components/Form.vue';

  export default {
    components: { Button, Form },
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
        this.$store.dispatch('getTravelsArray');
        this.$router.push({ name: 'Home' });
      },
    },
  };
</script>

<style scoped>
  input {
    width: 400px;
    box-sizing: border-box;
    margin-bottom: 15px;
    font-size: 16px;
    color: #555;
    padding: 10px 15px;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
  }
</style>

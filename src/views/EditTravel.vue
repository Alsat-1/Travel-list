<template>
  <div class="edit__travel">
    <Form @handle-submit="handleSubmit">
      <template #title>
        <h2>Edit travel</h2>
      </template>
      <input type="text" v-model="title" :id="id" />
      <input type="text" v-model="price" :id="id" />
      <input type="text" v-model="location" :id="id" />
      <Button>Edit</Button>
    </Form>
  </div>
</template>

<script>
  import Button from '@/components/Button.vue';
  import Form from '@/components/Form.vue';

  export default {
    props: {
      id: {
        type: [Number, String],
        required: true,
      },
    },
    components: { Button, Form },
    data() {
      return {
        title: '',
        price: '',
        location: '',
        url: `http://localhost:3000/travels/${this.id}`,
      };
    },
    async mounted() {
      const { title, price, location } = await this.$store.dispatch('getTravelForEdit', this.url);

      this.title = title;
      this.price = price;
      this.location = location;
    },
    methods: {
      handleSubmit() {
        const edited = {
          title: this.title,
          price: this.price,
          location: this.location,
        };

        this.$store.dispatch('editTravel', { url: this.url, payload: edited });
        this.$router.push({ name: 'Home' });
      },
    },
  };
</script>

<style scoped>
  input {
    width: 400px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: bold;
    color: #555;
    padding: 10px 15px;
    margin-bottom: 15px;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
  }
</style>

<template>
  <div class="edit__travel">
    <h2>Edit travel</h2>
    <form class="form" @submit.prevent="handleSubmit">
      <input type="text" v-model="title" :id="id" />
      <input type="text" v-model="price" :id="id" />
      <input type="text" v-model="location" :id="id" />
      <div class="form__btns">
        <Button>Edit travel</Button>
        <Button @click="this.$router.push({ name: 'Home' })">Back</Button>
      </div>
    </form>
  </div>
</template>

<script>
  import Button from '@/components/Button.vue';

  export default {
    props: {
      id: {
        type: [Number, String],
        required: true,
      },
    },
    components: { Button },
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
  .form__btns {
    width: 400px;
    margin: 0 auto;
    gap: 150px;
    display: flex;
    justify-content: space-between;
  }
</style>

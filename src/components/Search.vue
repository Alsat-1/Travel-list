<template>
  <input
    class="travel__search"
    type="text"
    placeholder="Search..."
    v-model="searchValue"
    @keyup="$emit('updateSearch')"
  />
</template>

<script>
  export default {
    props: {
      searchValue: {
        type: String,
        required: true,
      },
    },
    emits: ['updateSearch'],
  };
</script>

<style scoped>
  .travel__search {
    width: 480px;
    padding: 5px 10px;
    box-sizing: border-box;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
  }
</style>

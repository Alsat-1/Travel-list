<template>
  <div class="form__wrapper">
    <slot name="title"></slot>
    <form class="form" @submit.prevent="$emit('handleSubmit')">
      <slot></slot>
    </form>
  </div>
</template>

<script>
  export default {
    emits: ['handleSubmit'],
  };
</script>

<style scoped>
  .form {
    width: 500px;
    margin: 30px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
  export default {};
</script>

<style scoped>
  .button {
    padding: 7px 12px;
    font-size: 16px;
    flex-grow: 1;
    cursor: pointer;
  }
</style>

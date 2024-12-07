<script setup lang="ts">
const open = defineModel<boolean>({ required: true });
</script>

<template>
  <UModal v-model="open">
    Users go here
  </UModal>
</template>

<style scoped>

</style>

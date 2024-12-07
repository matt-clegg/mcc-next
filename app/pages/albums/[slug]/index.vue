<script setup lang="ts">

</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div
      v-for="image in images"
      :key="image.id"
    >
      <NuxtImage :src="image.url" />
    </div>
  </div>
</template>

<style scoped>

</style>

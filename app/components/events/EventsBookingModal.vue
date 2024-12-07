<script setup lang="ts">
const open = defineModel<boolean>({ required: true });
</script>

<template>
  <UDashboardModal v-model="open">
    <div class="p-4">
      <div class="h-48" />
    </div>
  </UDashboardModal>
</template>

<style scoped>

</style>

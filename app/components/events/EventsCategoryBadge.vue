<script setup lang="ts">
defineProps<{
  eventType: EventType;
}>();
</script>

<template>
  <UBadge
    :color="eventType.color"
    variant="solid"
  >
    {{ eventType.name }}
  </UBadge>
</template>

<style scoped>

</style>

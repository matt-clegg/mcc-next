<script setup lang="ts">
import { format, sub } from "date-fns";

const selected = ref({ start: sub(new Date(), { days: 7 }), end: new Date() });
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton icon="i-heroicons-calendar-days-20-solid">
      {{ format(selected.start, 'd MMM, yyy') }} - {{ format(selected.end, 'd MMM, yyy') }}
    </UButton>
  </UPopover>
</template>

<style scoped>

</style>

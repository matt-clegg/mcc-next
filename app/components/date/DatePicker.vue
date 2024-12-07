<script setup lang="ts">
import { format } from "date-fns";

defineOptions({
  inheritAttrs: false
});

const date = defineModel<Date | null>();

function formatDate(date: Date | null | undefined) {
  if (date) {
    return format(date, "d MMM, yyy");
  }

  return undefined;
}
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton
      icon="i-heroicons-calendar-days-20-solid"
      :label="formatDate(date)"
    />
    <template #panel="{ close }">
      <DatePickerWrapper
        v-model="date"
        is-requried
        v-bind="$attrs"
        @close="close"
      />
    </template>
  </UPopover>
</template>

<style scoped>

</style>

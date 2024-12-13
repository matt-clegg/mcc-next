<script setup lang="ts">
import { format } from "date-fns";

const date = defineModel<Date | null>();

withDefaults(defineProps<{
  placeholder?: string;
}>(), {
  placeholder: undefined
});

function formatTime(date: Date | null | undefined) {
  if (date) {
    return format(date, "HH:mm");
  }
  return undefined;
}
</script>

<template>
  <UPopover :popper="{ placement: 'bottom' }">
    <button
      class="relative block w-full gap-0.5 text-left disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 text-sm px-2.5 py-1.5 shadow-sm bg-white text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500"
    >
      <template v-if="date">
        {{ formatTime(date) }}
      </template>
      <span
        v-else
        class="text-gray-400"
      >
        {{ placeholder ?? "Select a time" }}
      </span>
    </button>
    <template #panel="">
      <div class="px-8 py-5">
        <TimePickerControls v-model="date" />
      </div>
    </template>
  </UPopover>
</template>

<style scoped>

</style>

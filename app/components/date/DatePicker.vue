<script setup lang="ts">
import { format } from "date-fns";

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<{
  mode?: "date" | "time" | "dateTime";
  placeholder?: string;
}>(), {
  mode: "dateTime",
  placeholder: undefined
});

const date = defineModel<Date | null>();

function formatDate(date: Date | null | undefined) {
  if (date) {
    if (props.mode === "dateTime") {
      return format(date, "d MMM, yyy HH:mm");
    }
    else {
      return format(date, "d MMM, yyy");
    }
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
        {{ formatDate(date) }}
      </template>
      <span
        v-else
        class="text-gray-400"
      >
        {{ placeholder ?? "Select a date" }}
      </span>
    </button>
    <template #panel>
      <DatePickerWrapper
        v-if="mode === 'date' || mode === 'dateTime'"
        v-model="date"
        is-requried
        v-bind="$attrs"
      />
      <template v-if="mode ==='time' || mode ==='dateTime'">
        <UDivider />
        <div class="py-3">
          <TimePicker
            v-model="date"
          />
        </div>
      </template>
    </template>
  </UPopover>
</template>

<style scoped>

</style>

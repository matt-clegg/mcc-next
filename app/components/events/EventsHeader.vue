<script setup lang="ts">
import { format, isSameDay, isSameMonth, isSameYear } from "date-fns";

const props = defineProps<{
  event: EventItem;
}>();

const formattedDate = computed(() => {
  const start = new Date(props.event.startDate);
  const end = new Date(props.event.endDate);

  if (isSameDay(start, end)) {
    return format(start, "do MMM, yyyy");
  }

  if (isSameMonth(start, end) && isSameYear(start, end)) {
    return `${format(start, "do")} - ${format(end, "do MMM, yyyy")}`;
  }

  if (isSameYear(start, end)) {
    return `${format(start, "do MMM")} - ${format(end, "do MMM, yyyy")}`;
  }

  return `${format(start, "do MMM, yyyy")} - ${format(end, "do MMM, yyyy")}`;
});

const formattedTime = computed(() => {
  const start = props.event.startDate;
  const end = props.event.endDate;

  return `${format(start, "h:mma")} - ${format(end, "h:mma")}`.toLowerCase();
});
</script>

<template>
  <div class="flex h-full flex-col justify-end">
    <!--    <NuxtImg -->
    <!--      class="absolute inset-0 object-cover" -->
    <!--      src="/images/wide.jpg" -->
    <!--    /> -->
    <!--    <div class="absolute inset-0 bg-gradient-to-t from-black from-15% to-85% opacity-80" /> -->

    <div class="z-10 text-white">
      <UContainer :ui="{ constrained: 'max-w-5xl' }">
        <h2 class="mb-2 text-2xl font-bold md:text-4xl">
          {{ event.title }}
        </h2>

        <div class="flex flex-wrap gap-3 text-sm">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-map-pin"
              class="size-5"
            />
            <span>
              {{ event.location }}
            </span>
          </div>

          <span>•</span>

          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-calendar-days"
              class="size-5"
            />
            <span>
              {{ formattedDate }}
            </span>
          </div>

          <span>•</span>

          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-clock"
              class="size-5"
            />
            <span>
              {{ formattedTime }}
            </span>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>

<style scoped>

</style>

﻿<script setup lang="ts">
import { formatDistanceToNow } from "date-fns";

const sortOptions = [
  {
    label: "Name",
    value: "name"
  },
  {
    label: "Date added",
    value: "date"
  }
];

const sortOption = ref(sortOptions[1]);
const sortDir = ref(true);

const sortValue = computed(() => {
  if (sortOption.value) {
    const prefix = sortDir.value ? "-" : "";
    return prefix + sortOption.value.value;
  }
  return undefined;
});

const { data: images, status } = await useFetch("/api/assets", {
  query: {
    sort: sortValue
  }
});

const sortIcon = computed(() => sortDir.value ? "i-heroicons-bars-arrow-up" : "i-heroicons-bars-arrow-down");

const disableSort = computed(() => status.value === "pending");
</script>

<template>
  <div class="flex gap-3 flex-col mt-4 sm:mt-0">
    <div class="flex gap-2 px-4 items-center">
      <small class="text-gray-700">Sort by</small>
      <u-select-menu
        v-model="sortOption"
        :options="sortOptions"
        placeholder="Sort by"
        :disabled="disableSort"
        class="min-w-[175px]"
      />
      <u-tooltip text="Toggle between ascending and descending order">
        <u-button
          :icon="sortIcon"
          variant="outline"
          :disabled="!sortOption || disableSort"
          @click="sortDir = !sortDir"
        />
      </u-tooltip>
    </div>
    <div class="flex-1 flex flex-col">
      <ul
        role="list"
        class="grid grid-cols-2 gap-x-4 gap-y-8 px-4 overflow-y-auto h-[337px]"
      >
        <li
          v-for="image in images"
          :key="image.id"
          class="relative"
        >
          <div class="group cursor-pointer overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <nuxt-img
              :src="image.id"
              provider="local"
              placeholder
              sizes="300px sm:230px"
              alt=""
              class="pointer-events-none aspect-[10/7] w-full object-cover group-hover:opacity-75"
            >
              <button
                type="button"
                class="absolute inset-0 focus:outline-none"
              >
                <span class="sr-only">View details for {{ image.filename }}</span>
              </button>
            </nuxt-img>
          </div>
          <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
            {{ image.filename }}
          </p>
          <p class="pointer-events-none block text-sm font-medium text-gray-500">
            {{ timeAgo(image.createdAt) }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>

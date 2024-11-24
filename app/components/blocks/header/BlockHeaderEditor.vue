<script setup lang="ts">
import type { BlockHeader } from "~/types/blocks";

const levels = [
  {
    label: "h1",
    value: 1
  },
  {
    label: "h2",
    value: 2
  },
  {
    label: "h3",
    value: 3
  },
  {
    label: "h4",
    value: 4
  },
  {
    label: "h5",
    value: 5
  },
  {
    label: "h6",
    value: 6
  }
];

const model = defineModel<BlockHeader>({ required: true });
</script>

<template>
  <div class="flex gap-2">
    <u-select
      v-model.number="model.level"
      option-attribute="label"
      :options="levels"
    />
    <u-input v-model="model.text" />
  </div>
</template>

<style scoped>

</style>

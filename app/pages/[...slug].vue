<script setup lang="ts">
import type { Block } from "~/types/blocks";

const route = useRoute();
const slugs = route.params.slug;
const path = Array.isArray(slugs) ? slugs?.join("/") : slugs;

const { data: page } = await useFetch(`/api/pages/${path}`);

const blocks: Block[] = [
  {
    type: "header",
    level: 1,
    text: "Hello World"
  },
  {
    type: "prose",
    content: "<p>Here is some content for you.</p>"
  }
];
</script>

<template>
  <div>
    <block-renderer :blocks="blocks" />
  </div>
</template>

<style scoped>

</style>

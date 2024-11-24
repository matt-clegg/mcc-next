<script setup lang="ts">
import type { Block } from "~/types/blocks";

const route = useRoute();
const slugs = route.params.slug;
const path = Array.isArray(slugs) ? slugs?.join("/") : slugs;

// const { error, data: page } = await useFetch(`/api/pages/${path}`);
//
// if (error.value) {
//   if (error.value.statusCode === 404) {
//     throw showError({
//       statusCode: 404,
//       statusMessage: "Page not found"
//     });
//   }
//   else {
//     // TODO: Maybe show toast? Maybe need error handler?
//     throw error.value;
//   }
// }

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
  <u-container>
    <block-renderer :blocks="blocks" />
  </u-container>
</template>

<style scoped>

</style>

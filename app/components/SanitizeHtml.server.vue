<script setup lang="ts">
import sanitizeHtml from "sanitize-html";

const props = defineProps<{
  html: string;
}>();

const clean = computed(() => sanitizeHtml(props.html));
</script>

<template>
  <div v-html="clean" />
</template>

<style scoped>

</style>

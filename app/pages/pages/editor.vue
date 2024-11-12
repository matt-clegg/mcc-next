<script setup lang="ts">
import type { Block } from "~/types/blocks";

const blocks = ref<Block[]>([]);
</script>

<template>
  <div>
    <block-renderer :blocks="blocks" />
  </div>
</template>

<style scoped>

</style>

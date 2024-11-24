<script setup lang="ts">
import type { BlockProse } from "~/types/blocks";

const model = defineModel<BlockProse>({ required: true });
</script>

<template>
  <u-textarea v-model="model.content" />
</template>

<style scoped>

</style>

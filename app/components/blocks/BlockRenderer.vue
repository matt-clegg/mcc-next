<script setup lang="ts">
import type { Block, BlockType } from "~/types/blocks";

withDefaults(defineProps<{
  blocks: Block[];
  tag?: string;
}>(), {
  tag: "div"
});

function getComponent(type: BlockType) {
  switch (type) {
    case "header":
      return defineAsyncComponent(() => import("~/components/blocks/header/BlockHeader.vue"));
    case "image":
      return defineAsyncComponent(() => import("~/components/blocks/BlockImage.vue"));
    case "prose":
      return defineAsyncComponent(() => import("~/components/blocks/BlockProse.vue"));
    default:
      console.warn(`Unknown block type: ${type}`);
  }
}

function getProps(block: Block) {
  const { type, ...props } = block;
  return props;
}
</script>

<template>
  <component :is="tag">
    <component
      :is="getComponent(block.type)"
      v-for="(block, index) in blocks"
      :key="index"
      v-bind="getProps(block)"
    />
  </component>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { useSortable } from "@vueuse/integrations/useSortable";
import type { Block, BlockType } from "~/types/blocks";

const blocks = ref<Block[]>([]);

const container = ref<HTMLDivElement | null>(null);

useSortable(container, blocks, {
  handle: ".handle"
});

type Tool = {
  label: string;
  block: BlockType;
};

const tools: Tool[] = [
  {
    label: "Add header",
    block: "header"
  },
  {
    label: "Add text",
    block: "prose"
  },
  {
    label: "Add image",
    block: "image"
  }
];

function addBlock(block: BlockType) {
  switch (block) {
    case "header":
      blocks.value.push({
        id: useHash(),
        type: "header",
        level: 1,
        text: ""
      });
      break;
    case "image":
      blocks.value.push({
        id: useHash(),
        type: "image",
        src: "",
        alt: ""
      });
      break;
    case "prose":
      blocks.value.push({
        id: useHash(),
        type: "prose",
        content: ""
      });
      break;
  }
}

function getComponent(type: BlockType) {
  switch (type) {
    case "header":
      return defineAsyncComponent(() => import("~/components/blocks/header/BlockHeaderEditor.vue"));
    case "image":
      return defineAsyncComponent(() => import("~/components/blocks/image/BlockImageEditor.vue"));
    case "prose":
      return defineAsyncComponent(() => import("~/components/blocks/prose/BlockProseEditor.vue"));
    default:
      console.warn(`Unknown block type: ${type}`);
  }
}
</script>

<template>
  <div>
    <div class="flex gap-2">
      <u-button
        v-for="tool in tools"
        :key="tool.block"
        @click="() => addBlock(tool.block)"
      >
        {{ tool.label }}
      </u-button>
    </div>
    <div ref="container">
      <div
        v-for="(block, index) in blocks"
        :key="block.id"
        class="outline outline-red-500"
      >
        <div class="handle">
          HANDLE
        </div>
        <div>
          {{ block.id }}
        </div>
        <!--        <component -->
        <!--          :is="getComponent(block.type)" -->
        <!--          v-model="blocks[index]" -->
        <!--        /> -->
      </div>
    </div>
    <pre>{{ blocks }}</pre>
  </div>
</template>

<style scoped>

</style>

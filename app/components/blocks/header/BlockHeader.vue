<script setup lang="ts">
const props = defineProps<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}>();

const tag = computed(() => {
  return `h${props.level}`;
});
</script>

<template>
  <component :is="tag">
    {{ text }}
  </component>
</template>

<style scoped>

</style>

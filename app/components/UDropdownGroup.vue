<script setup lang="ts">
import type { DropdownItem } from "#ui/types";

const props = defineProps<{
  items: DropdownItem[][];
}>();

const firstItem = computed(() => {
  if (!props.items.length) {
    return null;
  }

  if (props.items[0] && props.items[0].length) {
    return props.items[0][0];
  }

  return null;
});

const internalItems = computed(() => {
  const result = [...props.items];
  if (result.length && result[0] && result[0].length) {
    result[0].shift();

    if (result[0].length === 0) {
      result.shift();
    }
  }
  return result;
});

function onClick() {
  if (firstItem.value && firstItem.value.click !== undefined) {
    firstItem.value.click();
  }
}
</script>

<template>
  <UButtonGroup
    size="sm"
    orientation="horizontal"
  >
    <UButton
      v-if="firstItem"
      :label="firstItem.label"
      color="white"
      @click="onClick"
    />
    <UDropdown
      v-if="internalItems.length"
      :items="internalItems"
    >
      <UButton
        icon="i-heroicons-chevron-down-20-solid"
        color="white"
      />
    </UDropdown>
  </UButtonGroup>
</template>

<style scoped>

</style>

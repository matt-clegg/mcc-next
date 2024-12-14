<script setup lang="ts">
import { newsStatusOptions } from "~/utils/options";

const props = defineProps<{
  status: NewsStatus;
}>();

const color = computed(() => {
  switch (props.status) {
    case "published":
      return "emerald";
    case "draft":
      return "white";
    case "scheduled":
      return "blue";
    default:
      return undefined;
  }
});

const label = computed(() => newsStatusOptions.find(o => o.value === props.status)?.label ?? "");
</script>

<template>
  <UBadge
    :label="status"
    :color="color"
    variant="solid"
    size="xs"
  />
</template>

<style scoped>

</style>

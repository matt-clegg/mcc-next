<script setup lang="ts">
const props = defineProps<{
  status: EventStatus;
}>();

const color = computed(() => {
  switch (props.status) {
    case "draft":
      return "gray";
    case "published":
      return "emerald";
    case "cancelled":
      return "red";
  }
});
</script>

<template>
  <UBadge
    :label="capitalize(status)"
    :color="color"
    variant="solid"
    size="xs"
  />
</template>

<style scoped>

</style>

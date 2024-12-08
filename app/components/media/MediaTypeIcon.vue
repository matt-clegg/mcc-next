<script setup lang="ts">
const props = defineProps<{
  mimeType: string;
}>();

const icon = computed(() => {
  switch (props.mimeType) {
    case "image/jpeg":
    case "image/png":
      return "mdi-image";
    case "application/pdf":
      return "formkit:filepdf";
    case "video/mp4":
      return "mdi-video";
    case "folder":
      return "i-heroicons-folder";
    default:
      return "mdi-file";
  }
});
</script>

<template>
  <UIcon :name="icon" />
</template>

<style scoped>

</style>

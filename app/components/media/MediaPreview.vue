<script setup lang="ts">

const props = defineProps<{
  asset: Asset
}>();

</script>

<template>
  <UTooltip class="flex sm:flex-col"
            :text="asset.filename">
    <div
        class="w-16 flex-grow sm:w-full sm:h-[200px] flex-shrink-0 rounded-l-md sm:rounded-b-none sm:rounded-t-lg border border-gray-200 overflow-hidden">
      <NuxtImg
          v-if="asset.isImage"
          class="w-full h-full object-cover"
          :src="asset.id"
          provider="local"
          placeholder
          width="300"
          height="200"
          :alt="asset.filename"/>
      <div v-else class="w-full h-full bg-gray-100 flex items-center justify-center">
        <MediaTypeIcon :mime-type="asset.mimeType" class="size-8 sm:size-12 mx-auto"/>
      </div>
    </div>
    <div
        class="w-full p-2 rounded-r-md border border-l-0 sm:border sm:rounded-t-none sm:rounded-b-lg sm:border-t-0 border-gray-200 flex flex-col gap-2 overflow-hidden">
      <strong class="truncate text-sm sm:text-md">{{ asset.filename }}</strong>
      <div class="flex flex-col">
        <small>Uploaded {{ timeAgo( asset.createdAt ) }}</small>
        <small>By {{ asset.owner.firstName }} {{ asset.owner.lastName }}</small>
      </div>
    </div>
  </UTooltip>
</template>

<style scoped>

</style>
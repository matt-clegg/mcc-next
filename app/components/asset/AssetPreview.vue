<script setup lang="ts">
import { format } from "date-fns";
import { formatBytes } from "~/utils/formatting";

const props = defineProps<{
  asset: Asset;
  selected: boolean
}>();

const emits = defineEmits<{
  select: [string];
}>();

function onClick() {
  emits( "select", props.asset.id );
}
</script>

<template>
  <div
      class="flex h-full sm:flex-col hover:ring hover:ring-primary-500 hover:ring-opacity-75 rounded-md sm:rounded-lg"
      :class="[selected ? 'ring ring-primary-500' : '']"
      @click="onClick"
  >
    <div
        class="w-16 flex-grow sm:w-full sm:h-[200px] flex-shrink-0 rounded-l-md sm:rounded-b-none sm:rounded-t-lg border border-gray-200 overflow-hidden"
    >
      <div class="relative h-full">
        <div v-if="selected"
             class="absolute top-1 sm:top-2 left-1 sm:left-2 bg-primary-500 size-5 sm:size-6 rounded-full flex justify-center items-center">
          <UIcon
              name="i-heroicons-check-circle-20-solid" class="size-4 sm:size-5 text-white"></UIcon>
        </div>
        <UPopover
            class="hidden sm:block absolute top-2 right-2"
            :popper="{ placement: 'bottom-end' }"
        >
          <UButton
              icon="i-heroicons-information-circle"
              variant="solid"
              color="gray"
              size="xs"
          />

          <template #panel>
            <div class="px-3 py-2 flex flex-col cursor-default">
              <small v-if="asset.owner">Uploaded by: <strong>{{ asset.owner.firstName }} {{
                  asset.owner.lastName
                }}</strong></small>
              <small>Type: <strong>{{ asset.mimeType }}</strong></small>
              <small v-if="asset.size">Size: <strong>{{ formatBytes( asset.size ) }}</strong></small>
              <small>Added: <strong>{{ format( asset.createdAt, "dd MMM, yyy @ HH:mm" ) }}</strong> </small>
            </div>
          </template>
        </UPopover>

        <NuxtImg
            v-if="asset.isImage"
            class="w-full h-full object-cover"
            :src="asset.id"
            provider="local"
            placeholder
            lazy
            width="300"
            height="200"
            :alt="asset.filename"
        />
        <div
            v-else
            class="w-full h-full bg-gray-100 flex items-center justify-center"
        >
          <AssetTypeIcon
              :mime-type="asset.mimeType"
              class="size-8 sm:size-12 mx-auto"
          />
        </div>
      </div>
    </div>
    <div
        class="w-full p-2 rounded-r-md border border-l-0 sm:border sm:rounded-t-none sm:rounded-b-lg sm:border-t-0 border-gray-200 flex flex-col gap-1 overflow-hidden"
    >
      <strong class="truncate text-sm sm:text-md"
              :title="asset.filename">{{ asset.filename }}</strong>
      <div class="flex justify-between items-center">
        <small>Added {{ timeAgo( asset.createdAt ) }}</small>
        <Can
            :ability="canDeleteAsset"
            :args="[asset]"
        >
          <UButton
              class="hidden sm:block"
              icon="i-heroicons-trash"
              variant="ghost"
              size="xs"
              color="red"
          />
        </Can>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

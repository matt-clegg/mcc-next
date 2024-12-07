<script setup lang="ts">
const open = ref(true);

const { data: images } = await useFetch("/api/assets");

const { files, addFiles } = useFiles();

function onInputChange(files: FileList) {
  console.log("FILES ADDED!", files);
  addFiles(files);
}

async function onSubmit() {

}
</script>

<template>
  <u-modal
    v-model="open"
    :ui="{ width: 'sm:max-w-4xl', height: 'sm:h-3xl' }"
    prevent-close
  >
    <u-card>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Media picker
          </h3>
        </div>
      </template>
      <div class="flex gap-4 flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-800">
        <div class="flex flex-grow">
          <file-uploader
            class="h-full w-full"
            @input-change="onInputChange"
          />
        </div>
        <div class="flex flex-grow">
          <media-browser class="w-full" />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <u-button
            variant="ghost"
            @click="open = false"
          >
            Cancel
          </u-button>
          <u-button @click="onSubmit">
            Upload
          </u-button>
        </div>
      </template>
    </u-card>
  </u-modal>
</template>

<style scoped>

</style>

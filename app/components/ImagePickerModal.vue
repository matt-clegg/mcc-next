<script setup lang="ts">
const props = defineProps<{
  folder?: string;
}>();

const open = defineModel<boolean>("open", { required: true });

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
  <UDashboardModal
    v-model="open"
    prevent-close
    :ui="{
      width: 'sm:max-w-4xl',
      height: 'sm:h-3xl',
      body: {
        base: 'flex-1 flex flex-col gap-y-3 overflow-y-auto'
      }
    }"
  >
    <!--    <UCard> -->
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          Media picker
        </h3>
      </div>
    </template>
    <!--      <div class="flex gap-4 flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-800"> -->
    <!--        <div class="flex flex-grow"> -->
    <!--          <file-uploader -->
    <!--            class="h-full w-full" -->
    <!--            @input-change="onInputChange" -->
    <!--          /> -->
    <!--        </div> -->
    <!--        <div class="flex flex-grow"> -->
    <!--          <media-browser -->
    <!--              :folder="folder" -->
    <!--              class="w-full" /> -->
    <!--        </div> -->
    <!--      </div> -->

    <MediaBrowser :folder="folder" />

    <!--    <div class="h-full"> -->
    <!--      content -->
    <!--    </div> -->

    <template #footer>
      <div class="flex justify-end gap-2 w-full">
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
    <!--    </UCard> -->
  </UDashboardModal>
</template>

<style scoped>

</style>

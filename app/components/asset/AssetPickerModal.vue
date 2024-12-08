<script setup lang="ts">
const props = withDefaults( defineProps<{
  folder?: string;
  selectedAsset?: string,
  header?: string;
  assetType?: string;
}>(), {
  folder: undefined,
  selectedAsset: undefined,
  header: "Asset picker",
} );

const emits = defineEmits<{
  selected: [string];
}>();

const open = defineModel<boolean>( "open", { required: true } );

const selectedAsset = ref<string | undefined>( props.selectedAsset );

watch( open, ( val ) => {
  if ( val ) {
    selectedAsset.value = props.selectedAsset;
  }
} );

const { data: assets } = await useFetch( "/api/assets" );

const { files, addFiles } = useFiles();

function onInputChange( files: FileList ) {
  console.log( "FILES ADDED!", files );
  addFiles( files );
}

async function onSubmit() {
  if ( selectedAsset.value ) {
    emits( "selected", selectedAsset.value );
    close();
  }
}

function close() {
  open.value = false;
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
        base: 'flex-1 flex flex-col gap-y-3 overflow-y-auto',
        padding: 'p-0 sm:p-0'
      }
    }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          {{ header }}
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

    <AssetBrowser :folder="folder"
                  v-model="selectedAsset"
                  no-folders
                  :asset-type="assetType"/>

    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <UButton
            variant="ghost"
            @click="open = false"
        >
          Cancel
        </UButton>
        <UButton @click="onSubmit">
          Select
        </UButton>
      </div>
    </template>
  </UDashboardModal>
</template>

<style scoped>

</style>

<script setup lang="ts">
// const { addFiles } = useFiles();

const emits = defineEmits(["input-change"]);

const props = defineProps<{
  multiple?: boolean;
}>();

function onInputChange(e: Event) {
  const target = e.target as HTMLInputElement;
  const files = target.files as FileList;
  emits("input-change", files);
}

function filesDropped(files: FileList) {
  emits("input-change", files);
}

const label = computed(() => {
  if (props.multiple) {
    return "Drag files or click to choose files to upload";
  }
  else {
    return "Drag a file or click to choose a file to upload";
  }
});
</script>

<template>
  <drop-zone
    v-slot="{ dropZoneActive }"
    @drop="filesDropped"
  >
    <label
      for="file-input"
      class="relative w-full h-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-12 text-center flex flex-col items-center justify-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      :class="[dropZoneActive ? 'bg-primary-50 border-primary-300 text-primary-500' : 'text-gray-900']"
    >
      <u-icon
        name="i-heroicons:document-arrow-up"
        class="mx-auto size-12 "
        :class="[dropZoneActive ? 'text-primary-300' : 'text-gray-400']"
      />
      <span class="mt-2 block text-sm font-semibold ">
        {{ label }}
      </span>
      <input
        id="file-input"
        type="file"
        class="hidden"
        @change="onInputChange"
      >
    </label>
  </drop-zone>
</template>

<style scoped>

</style>

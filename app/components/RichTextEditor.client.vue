<script setup lang="ts">
import "quill/dist/quill.snow.css";
import { QuillEditor } from "@vueup/vue-quill";

const options = {
  modules: {
    toolbar: ["bold", "italic", "underline"]
  },
  theme: "snow"
};
</script>

<template>
  <QuillEditor
    :options="options"
    toolbar="my-toolbar"
  >
    <template #toolbar>
      <div id="my-toolbar">
        <UButton>IMAGE</UButton>
      </div>
    </template>
  </QuillEditor>
</template>

<style scoped>

</style>

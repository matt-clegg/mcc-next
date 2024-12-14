<script setup lang="ts">
import "quill/dist/quill.snow.css";
import { QuillEditor } from "@vueup/vue-quill";
import "~/assets/quill.css";

const content = defineModel<string | undefined>({ required: true });

withDefaults(defineProps<{
  contentType?: "html" | "text";
  placeholder?: string;
}>(), {
  contentType: "html"
});

const options = {
  modules: {
    toolbar: ["bold", "italic", "underline"]
  },
  theme: "snow"
};
</script>

<template>
  <div>
    <QuillEditor
      v-model:content="content"
      :content-type="contentType"
      :options="options"
      :placeholder="placeholder"
    >
      <!--      <template #toolbar> -->
      <!--        <div id="my-toolbar"> -->
      <!--          <UButton>IMAGE</UButton> -->
      <!--        </div> -->
      <!--      </template> -->
    </QuillEditor>
  </div>
</template>

<style scoped>

</style>

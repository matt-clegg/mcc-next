<script setup lang="ts">
import { EditorContent, useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const editor = useEditor({
  extensions: [
    StarterKit,
    Underline
  ],
  autofocus: true,
  editorProps: {
    attributes: {
      class: "prose focus:outline-none py-4"
    }
  }
});
</script>

<template>
  <div
    v-if="editor"
  >
    <div>
      <u-button-group>
        <u-button
          icon="i-fa6-solid:heading"
          color="gray"
          :variant="editor.isActive('heading', { level: 2 }) ? 'solid' : 'ghost'"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        />
      </u-button-group>

      <u-button-group>
        <u-button
          icon="i-fa6-solid:bold"
          color="gray"
          :variant="editor.isActive('bold') ? 'solid' : 'ghost'"
          @click="editor.chain().focus().toggleBold().run()"
        />
        <u-button
          icon="i-fa6-solid:underline"
          color="gray"
          :variant="editor.isActive('underline') ? 'solid' : 'ghost'"
          @click="editor.chain().focus().toggleUnderline().run()"
        />
        <u-button
          icon="i-fa6-solid:italic"
          color="gray"
          :variant="editor.isActive('italic') ? 'solid' : 'ghost'"
          @click="editor.chain().focus().toggleItalic().run()"
        />
      </u-button-group>
    </div>
    <editor-content
      :editor="editor"
    />

    <image-modal />
  </div>
</template>

<style scoped>

</style>

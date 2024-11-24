<script setup lang="ts">
const emits = defineEmits(["drop"]);

function onDrop(e: DragEvent) {
  setInactive();
  emits("drop", [...e.dataTransfer!.files]);
}

function preventDefaults(e: Event) {
  e.preventDefault();
}

const active = ref(false);
let inactiveTimeout: number | undefined = undefined;

function setActive() {
  active.value = true;
  clearTimeout(inactiveTimeout);
}

function setInactive() {
  inactiveTimeout = window.setTimeout(() => {
    active.value = false;
  }, 50);
}

const events = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => {
  events.forEach((event) => {
    document.body.addEventListener(event, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((event) => {
    document.body.removeEventListener(event, preventDefaults);
  });
});
</script>

<template>
  <div
    :data-active="active"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
  >
    <slot :drop-zone-active="active" />
  </div>
</template>

<style scoped>

</style>

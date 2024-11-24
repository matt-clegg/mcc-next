<script setup lang="ts">
const route = useRoute();
const slugs = route.params.slug;
const path = Array.isArray(slugs) ? slugs?.join("/") : slugs;
</script>

<template>
  <div
    class="mx-auto max-w-3xl mt-10"
  >
    <u-link to="/">
      Back
    </u-link>
    Edit page {{ path }}
    <tip-tap />
  </div>
</template>

<style scoped>

</style>

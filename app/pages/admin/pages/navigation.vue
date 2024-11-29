<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin"
});

const { data: navigation, refresh } = await useFetch("/api/admin/navigation");

async function onAdd() {
  try {
    const result = await $fetch("/api/admin/navigation", {
      method: "POST",
      body: {
        name: "Contact",
        url: "/contact",
        parent: null,
        order: 1
      }
    });

    console.log("result", result);
    await refresh();
  }
  catch (err: any) {
    handleFetchError(err);
  }
}
</script>

<template>
  <div>
    navigation here
    {{ navigation }}
    <UButton @click="onAdd">
      Add
    </UButton>
  </div>
</template>

<style scoped>

</style>

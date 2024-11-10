<script setup lang="ts">
const roles = await useFetch("/api/roles");

const newRoleName = ref("");

async function addRole() {
  try {
    await $fetch("/api/roles", {
      method: "POST",
      body: {
        name: newRoleName.value
      }
    });
    await roles.refresh();
    newRoleName.value = "";
  }
  catch (err: any) {
    console.error("error adding role", err);
  }
}
</script>

<template>
  <div>
    <u-card>
      <strong>Roles</strong>
      <pre>{{ roles.data }}</pre>
      <u-input v-model="newRoleName" />
      <u-button @click="addRole">
        Add role
      </u-button>
    </u-card>
  </div>
</template>

<style scoped>

</style>

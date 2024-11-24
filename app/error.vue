<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();

async function handleError() {
  await clearError({ redirect: "/" });
}
</script>

<template>
  <div>
    <h2>{{ error.statusCode }}</h2>
    <p>{{ error.statusMessage }}</p>
    <u-button @click="handleError">
      Go home
    </u-button>
  </div>
</template>

<style scoped>

</style>

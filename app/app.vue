<script setup lang="ts">
const { loggedIn, fetch } = useUserSession();

if (loggedIn) {
  console.log("fetching");
  await fetch();
}
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </div>
</template>

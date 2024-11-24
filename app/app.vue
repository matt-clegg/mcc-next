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
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Space Grotesk", Arial, sans-serif;
}
</style>

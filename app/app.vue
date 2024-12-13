<script setup lang="ts">
useHead({
});

useSeoMeta({
  description: "[description]",
  ogTitle: "Maidstone Canoe Club",
  ogDescription: "[og:description]",
  ogImage: "[og:image]",
  ogUrl: "[og:url]",
  twitterTitle: "Maidstone Canoe Club",
  twitterDescription: "[twitter:description]",
  twitterImage: "[twitter:image]",
  twitterCard: "summary"
});

useHead({
  titleTemplate: title => title ? `${title} - MCC Next` : "MCC Next",
  htmlAttrs: {
    lang: "en"
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png"
    }
  ]
});

provideHeadlessUseId(() => useId());
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
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

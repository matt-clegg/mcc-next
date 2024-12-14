<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin"
});

useSeoMeta({
  title: "Event settings"
});

const links = [
  {
    label: "Event settings",
    icon: "i-heroicons-cog-8-tooth",
    to: "/admin/events/settings/",
    exact: true
  },
  {
    label: "Event categories",
    icon: "i-heroicons-list-bullet",
    to: "/admin/events/settings/event-categories"
  }
];
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Event settings"
      />
      <UDashboardToolbar class="hidden overflow-x-auto px-1.5 py-0 sm:flex">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped>

</style>

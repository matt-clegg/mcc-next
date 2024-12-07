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
    label: "Event types",
    icon: "i-heroicons-list-bullet",
    to: "/admin/events/settings/event-types"
  }
];
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Event settings"
      />
      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto hidden sm:flex">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped>

</style>

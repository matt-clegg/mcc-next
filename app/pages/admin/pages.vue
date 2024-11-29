<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin"
});

const links = [
  {
    label: "Pages",
    icon: "i-heroicons-document-duplicate",
    to: "/admin/pages",
    exact: true
  },
  {
    label: "Navigation",
    icon: "i-heroicons-queue-list",
    to: "/admin/pages/navigation"
  },
  {
    label: "Redirects",
    icon: "i-heroicons-link",
    to: "/admin/pages/redirects"
  }
];
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Pages"
      />
      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto hidden sm:flex">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>

    <!--    <LazyAdminPagesEditSideOver v-model:open="editSlideoverOpen" /> -->
  </UDashboardPage>
</template>

<style scoped>

</style>

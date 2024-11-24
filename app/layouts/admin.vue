<script setup lang="ts">
const { data: userCount } = await useFetch("/api/admin/users/count");

const links = computed(() => [
  {
    id: "home",
    label: "Home",
    icon: "i-heroicons-home",
    to: "/admin"
  },
  {
    id: "users",
    label: "Users",
    icon: "i-heroicons-users",
    to: "/admin/users",
    badge: userCount.value
  },
  {
    id: "events",
    label: "Events",
    to: "/admin/events",
    icon: "i-heroicons-calendar-days",
    children: [{
      label: "Events",
      to: "/admin/events",
      exact: true,
      badge: "464"
    }, {
      label: "Bookings",
      to: "/admin/events/members",
      badge: "35625"
    }]
  }
]);
</script>

<template>
  <u-dashboard-layout>
    <u-dashboard-panel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <u-dashboard-navbar>
        <template #right>
          <u-button
            to="/"
            variant="ghost"
            icon="i-heroicons-arrow-long-left"
          >
            Back to site
          </u-button>
        </template>
      </u-dashboard-navbar>

      <u-dashboard-sidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <u-dashboard-sidebar-links :links="links" />

        <!--        <u-divider /> -->

        <!--        <u-dashboard-sidebar-links -->
        <!--          :links="[{ label: 'Colors', draggable: true, children: colors }]" -->
        <!--          @update:links="colors => defaultColors = colors" -->
        <!--        /> -->

        <div class="flex-1" />

        <!--        <u-dashboard-sidebar-links :links="footerLinks" /> -->

        <u-divider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <!--          <UserDropdown /> -->
        </template>
      </u-dashboard-sidebar>
    </u-dashboard-panel>

    <slot />
  </u-dashboard-layout>
</template>

<style scoped>

</style>

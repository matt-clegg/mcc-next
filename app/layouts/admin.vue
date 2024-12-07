<script setup lang="ts">
import { computedAsync } from "@vueuse/core";
import type { DashboardSidebarLink } from "#ui-pro/types";

const { data: userCount } = await useFetch("/api/admin/users/count");
const { data: newsCount } = await useFetch("/api/admin/news/count");

const links = computedAsync(async () => {
  const items: DashboardSidebarLink[] = [
    {
      label: "Home",
      icon: "i-heroicons-home",
      to: "/admin"
    },
    {
      label: "News",
      icon: "i-heroicons-newspaper",
      to: "/admin/news",
      badge: abbreviateNumber(newsCount.value ?? 0)
    }
  ];

  items.push({
    label: "Pages",
    icon: "i-heroicons-document-duplicate",
    to: "/admin/pages",
    children: [
      {
        label: "Pages",
        to: "/admin/pages",
        exact: true
      },
      {
        label: "Navigation",
        to: "/admin/pages/navigation"
      },
      {
        label: "Redirects",
        to: "/admin/pages/redirects"
      }
    ]
  });

  if (await allows(adminListUsers)) {
    const users: DashboardSidebarLink = {
      label: "Users",
      icon: "i-heroicons-users",
      to: "/admin/users",
      children: [{
        label: "Users",
        to: "/admin/users",
        badge: abbreviateNumber(userCount.value ?? 0)
      }]
    };

    if (await allows(adminListRoles)) {
      users.children!.push({
        label: "User roles",
        to: "/admin/roles"
      });
    }

    items.push(users);
  }

  items.push({
    label: "Events",
    to: "/admin/events",
    icon: "i-heroicons-calendar-days",
    children: [
      {
        label: "Events",
        to: "/admin/events",
        badge: abbreviateNumber(353)
      },
      {
        label: "Bookings",
        to: "/admin/events/members",
        badge: abbreviateNumber(35625)
      },
      {
        label: "Settings",
        to: "/admin/events/settings"
      }
    ]
  });

  return items;
}, []);
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

        <u-dashboard-sidebar-links
          :links="links"
        />

        <!--        <u-divider /> -->

        <!--        <u-dashboard-sidebar-links -->
        <!--          :links="[{ label: 'Colors', draggable: true, children: colors }]" -->
        <!--          @update:links="colors => defaultColors = colors" -->
        <!--        /> -->

        <!--        <div class="flex-1" /> -->

        <!--        <u-dashboard-sidebar-links :links="footerLinks" /> -->

        <!--        <u-divider class="sticky bottom-0" /> -->

        <!--        <template #footer> -->
        <!--          &lt;!&ndash; ~/components/UserDropdown.vue &ndash;&gt; -->
        <!--          &lt;!&ndash;          <UserDropdown /> &ndash;&gt; -->
        <!--        </template> -->
      </u-dashboard-sidebar>
    </u-dashboard-panel>

    <slot />
  </u-dashboard-layout>
</template>

<style scoped>

</style>

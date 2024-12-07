<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin"
});

useSeoMeta({
  title: "Events"
});

const columns = [{
  key: "title",
  label: "Title",
  sortable: true
}, {
  key: "createdAt",
  label: "Date created",
  sortable: true
}, {
  key: "actions"
}];

const { page, limit } = usePagination();
const { sortConfig, sortValue } = useSort();
const { q, qDebounced } = useQuery();

const {
  data: events,
  count,
  status
} = await useDataList("/api/admin/events", qDebounced, page, limit, sortValue);

watch(q, () => page.value = 1);

function actionItems(row: any) {
  return [
    [{
      label: "Edit event",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id)
    }],
    [{
      label: "Delete event",
      icon: "i-heroicons-trash-20-solid"
    }]
  ];
}

const resultsLabel = computed(() => formatResultLabel(count.value, limit.value));
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Events"
        :badge="count"
      >
        <template #right>
          <UInput
            ref="input"
            v-model="q"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Filter events..."
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
          />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!--          <USelectMenu -->
          <!--            v-model="selectedStatuses" -->
          <!--            icon="i-heroicons-check-circle" -->
          <!--            placeholder="Status" -->
          <!--            multiple -->
          <!--            :options="defaultStatuses" -->
          <!--            :ui-menu="{ option: { base: 'capitalize' } }" -->
          <!--          /> -->
          <!--          <USelectMenu -->
          <!--            v-model="selectedLocations" -->
          <!--            icon="i-heroicons-map-pin" -->
          <!--            placeholder="Location" -->
          <!--            :options="defaultLocations" -->
          <!--            multiple -->
          <!--          /> -->
        </template>

        <template #right>
          <div class="flex gap-4 items-center">
            <small>{{ resultsLabel }}</small>
            <UPagination
              v-model="page"
              :page-count="limit"
              :total="count"
            />
          </div>

          <!--          <USelectMenu -->
          <!--            v-model="selectedColumns" -->
          <!--            icon="i-heroicons-adjustments-horizontal-solid" -->
          <!--            :options="defaultColumns" -->
          <!--            multiple -->
          <!--            class="hidden lg:block" -->
          <!--          > -->
          <!--            <template #label> -->
          <!--              Display -->
          <!--            </template> -->
          <!--          </USelectMenu> -->
        </template>
      </UDashboardToolbar>
      <UTable
        v-model:sort="sortConfig"
        :rows="events"
        :columns="columns"
        :loading="status === 'pending'"
        sort-mode="manual"
        class="w-full"
        :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
      >
        <template #name-data="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar
              v-bind="row.avatar"
              :alt="row.name"
              size="xs"
            />

            <span class="text-gray-900 dark:text-white font-medium">{{ row.firstName }} {{ row.lastName }}</span>
          </div>
        </template>

        <template #createdAt-data="{ row }">
          <UTooltip :text="formatDate(row.createdAt, 'do MMM yyyy @ HH:mm')">
            {{ timeAgo(row.createdAt) }}
          </UTooltip>
        </template>

        <template #lastAccess-data="{ row }">
          <UTooltip :text="formatDate(row.lastAccess, 'do MMM yyyy @ HH:mm')">
            {{ timeAgo(row.lastAccess) }}
          </UTooltip>
        </template>

        <template #actions-data="{ row }">
          <div class="flex justify-end">
            <UButtonGroup
              size="sm"
              orientation="horizontal"
            >
              <UButton
                label="Edit"
                color="white"
              />
              <UDropdown :items="actionItems(row)">
                <UButton
                  icon="i-heroicons-chevron-down-20-solid"
                  color="white"
                />
              </UDropdown>
            </UButtonGroup>
          </div>
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped>

</style>

<script setup lang="ts">
import EventsStatusBadge from "~/components/events/EventsStatusBadge.vue";

definePageMeta({
  layout: "admin",
  middleware: "admin"
});

useSeoMeta({
  title: "Events"
});

const columns = [
  {
    key: "status",
    label: "Status",
    sortable: true
  },
  {
    key: "title",
    label: "Title",
    sortable: true
  },
  {
    key: "location",
    label: "Location",
    sortable: true
  },
  {
    key: "startDate",
    label: "Start date",
    sortable: true
  },
  {
    key: "endDate",
    label: "End date"
  },
  {
    key: "createdAt",
    label: "Date created",
    sortable: true
  },
  {
    key: "actions"
  }];

const { page, limit } = usePagination();
const { sortConfig, sortValue } = useSort({
  column: "createdAt",
  direction: "desc"
});
const { q, qDebounced } = useQuery();

const {
  data: events,
  count,
  status
} = await useDataList("/api/admin/events", { q: qDebounced, page, limit, sort: sortValue });

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
        <template #status-data="{ row }">
          <EventsStatusBadge :status="row.status" />
        </template>

        <template #title-data="{ row }">
          <ULink
            :to="'/events/' + row.id"
            inactive-class="text-primary"
            class="truncate"
          >{{ row.title }}</ULink>
        </template>

        <template #startDate-data="{ row }">
          <span>
            {{ formatDate(row.startDate, 'do MMM, yyyy - HH:mm') }}
          </span>
        </template>

        <template #endDate-data="{ row }">
          <span>
            {{ formatDate(row.endDate, 'do MMM, yyyy - HH:mm') }}
          </span>
        </template>

        <template #createdAt-data="{ row }">
          <UTooltip :text="formatDate(row.createdAt, 'do MMM, yyyy - HH:mm')">
            {{ timeAgo(row.createdAt) }}
          </UTooltip>
        </template>

        <template #lastAccess-data="{ row }">
          <UTooltip :text="formatDate(row.lastAccess, 'do MMM, yyyy - HH:mm')">
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

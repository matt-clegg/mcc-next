<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin"
});

useSeoMeta({
  title: "News"
});

const columns = [
  {
    key: "status"
  },
  {
    key: "title",
    label: "Title",
    sortable: true
  },
  // {
  //   key: "slug",
  //   label: "URL"
  // },
  {
    key: "author",
    label: "Author"
  },
  {
    key: "createdAt",
    label: "Date created",
    sortable: true
  }, {
    key: "actions"
  }];

const { page, limit } = usePagination();
const { sortConfig, sortValue } = useSort({ column: "createdAt", direction: "desc" });
const { q, qDebounced } = useQuery();

const fields = ref([
  "status",
  "title",
  "createdAt",
  "slug",
  "createdBy.firstName",
  "createdBy.lastName",
  "createdBy.email"
]);

const {
  data: news,
  count,
  status
} = await useDataList<News[]>("/api/admin/news", { q: qDebounced, page, limit, sort: sortValue, fields });

watch(q, () => page.value = 1);

function actionItems(_: any) {
  return [
    [{
      label: "Delete",
      icon: "i-heroicons-trash-20-solid"
    }]
  ];
}

const resultsLabel = computed(() => formatResultLabel(count.value, limit.value));

function getNewsUrl(row: News) {
  return `/news/${row.slug}`;
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="News"
        :badge="count"
      >
        <template #right>
          <UInput
            ref="input"
            v-model="q"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Filter news posts..."
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
        :rows="news"
        :columns="columns"
        :loading="status === 'pending'"
        sort-mode="manual"
        class="w-full"
        :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
      >
        <template #title-data="{ row }">
          <div class="flex flex-col">
            <span class="text-gray-700 font-medium">{{ row.title }}</span>
            <ULink
              :to="getNewsUrl(row)"
              inactive-class="text-primary"
            >
              {{ getNewsUrl(row) }}
            </ULink>
          </div>
        </template>

        <template #status-data="{ row }">
          <NewsStatusBadge :status="row.status" />
        </template>

        <template #createdAt-data="{ row }">
          <UTooltip :text="formatDate(row.createdAt, 'do MMM yyyy @ HH:mm')">
            {{ timeAgo(row.createdAt) }}
          </UTooltip>
        </template>

        <template #slug-data="{ row }">
          <UButton
            :to="getNewsUrl(row)"
            variant="link"
            size="sm"
          >
            /news/{{ row.slug }}
          </UButton>
        </template>

        <template #author-data="{ row }">
          <div class="flex items-center gap-2">
            <UAvatar size="xs" />
            <span class="text-gray-900 font-medium">{{ row.createdBy.firstName }} {{ row.createdBy.lastName }}</span>
          </div>
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

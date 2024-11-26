<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin"
});

const columns = [{
  key: "from",
  label: "From"
}, {
  key: "to",
  label: "To"
}, {
  key: "responseCode",
  label: "Response code"
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
  data: redirects,
  count,
  status
} = await useDataList<Redirect[]>("/api/redirects", qDebounced, page, limit, sortValue);

watch(q, () => page.value = 1);

function actionItems(row: any) {
  return [
    [{
      label: "Edit redirect",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id)
    }],
    [{
      label: "Delete redirect",
      icon: "i-heroicons-trash-20-solid"
    }]
  ];
}

const resultsLabel = computed(() => formatResultLabel(count.value, limit.value));
</script>

<template>
  <div>
    <UDashboardToolbar
      :ui="{ container: 'flex-col items-end sm:flex-row gap-y-2',
             left: 'flex-grow w-full sm:w-auto' }"
    >
      <template #left>
        <UInput
          ref="input"
          v-model="q"
          icon="i-heroicons-funnel"
          autocomplete="off"
          class="w-full sm:w-auto"
          placeholder="Filter redirects..."
          @keydown.esc="$event.target.blur()"
        />
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
      </template>
    </UDashboardToolbar>
    <UTable
      v-model:sort="sortConfig"
      :rows="redirects"
      :columns="columns"
      :loading="status === 'pending'"
      sort-mode="manual"
      class="w-full"
      :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
    >
      <template #createdAt-data="{ row }">
        <UTooltip :text="formatDate(row.createdAt, 'do MMM yyyy @ HH:mm')">
          {{ timeAgo(row.createdAt) }}
        </UTooltip>
      </template>

      <template #actions-data="{ row }">
        <div class="flex justify-end">
          <UDropdown :items="actionItems(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </div>
      </template>
    </UTable>
  </div>
</template>

<style scoped>

</style>

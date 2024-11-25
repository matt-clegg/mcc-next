<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin"
});

const newRoleModalOpen = ref(false);

const columns = [{
  key: "name",
  label: "Name",
  sortable: true
}, {
  key: "isPublic",
  label: "Visibility"
}, {
  key: "actions"
}];

const { page, limit } = usePagination();
const { sortConfig, sortValue } = useSort();
const { q, qDebounced } = useQuery();

const query = computed(() => ({
  q: qDebounced.value,
  page: page.value,
  limit: limit.value,
  sort: sortValue.value
}));

const { data, status, refresh } = await useFetch<Paginated<any[]>>("/api/admin/roles", {
  query,
  default: () => ({ data: [], count: 0 })
});

const roles = computed(() => data.value.data);
const count = computed(() => data.value.count);

watch(q, () => page.value = 1);

function actionItems(row: any) {
  return [
    [{
      label: "Edit role",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id)
    }],
    [{
      label: "Delete role",
      icon: "i-heroicons-trash-20-solid"
    }]
  ];
}

const resultsLabel = computed(() => {
  if (!count.value || count.value === 0) {
    return "No results";
  }

  return count.value === 1 ? "1 result" : `${Math.min(limit.value, count.value)} of ${count.value} results`;
});
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="User Roles"
        :badge="count"
      >
        <template #right>
          <UInput
            ref="input"
            v-model="q"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Filter roles..."
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
          />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UButton
            icon="i-heroicons-plus"
            @click="newRoleModalOpen = true"
          >
            Add role
          </UButton>
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
        :rows="roles"
        :columns="columns"
        :loading="status === 'pending'"
        sort-mode="manual"
        class="w-full"
        :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
      >
        <template #name-data="{ row }">
          <span class="text-gray-900 font-medium">
            {{ row.name }}
          </span>
        </template>

        <template #isPublic-data="{ row }">
          <UBadge
            :label="row.isPublic ? 'Public' : 'Hidden'"
            :color="row.isPublic ? 'green' : 'blue'"
            variant="subtle"
          />
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
      <LazyAdminRolesCreateModal
        v-model:open="newRoleModalOpen"
        @created="refresh"
      />
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped>

</style>

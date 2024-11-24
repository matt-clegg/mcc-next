<script setup lang="ts">
import type { User } from "#auth-utils";

definePageMeta({
  layout: "admin"
});

const columns = [{
  key: "name",
  label: "Name",
  sortable: true
}, {
  key: "email",
  label: "Email",
  sortable: true
}];

const q = ref();
const page = ref(1);
const limit = ref(20);

const sort = ref();

const sortValue = computed(() => {
  return undefined;
});

const { data, status } = await useFetch<Paginated<User[]>>("/api/admin/users", {
  query: {
    sort: sortValue.value,
    page,
    limit,
    q
  },
  default: () => ({ data: [], count: 0 })
});

const users = computed(() => data.value.data);
const count = computed(() => data.value.count);

const pageCount = computed(() => count.value === 0 ? 0 : Math.ceil(count.value / limit.value));
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Users"
        :badge="count"
      >
        <template #right>
          <UInput
            ref="input"
            v-model="q"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Filter users..."
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
          >
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>
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
          <!--          TODO: pagination -->

          <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="count"
          />

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
        v-model:sort="sort"
        :rows="users"
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
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped>

</style>

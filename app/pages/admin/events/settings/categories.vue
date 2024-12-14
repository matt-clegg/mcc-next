<script setup lang="ts">
import { computedAsync } from "@vueuse/core";

definePageMeta({
  layout: "admin",
  middleware: "admin"
});

useSeoMeta({
  title: "Event categories"
});

const columns = [
  {
    key: "name",
    label: "Name",
    sortable: true
  },
  {
    key: "color",
    label: "Colour"
  },
  {
    key: "createdBy",
    label: "Created by",
    sortable: true
  },
  {
    key: "createdAt",
    label: "Date created",
    sortable: true
  },
  {
    key: "actions"
  }
];

const createEventCategoryModalOpen = ref(false);
const editEventCategoryModalOpen = ref(false);
const deleteEventCategoryModalOpen = ref(false);
const editEventCategory = ref<EventCategory | null>(null);

const { page, limit } = usePagination();
const { sortConfig, sortValue } = useSort(
  { column: "name", direction: "asc" }
);

const fields = ref([
  "id",
  "name",
  "color",
  "createdBy.firstName",
  "createdBy.lastName",
  "createdAt"
]);

const {
  data: eventCategories,
  count,
  status,
  refresh
} = await useDataList<EventCategory>("/api/admin/events/categories", { page, limit, sort: sortValue, fields });

const canEdit = computedAsync(async () => await allows(canEditEventCategory));
const canDelete = computedAsync(async () => await allows(canDeleteEventCategory));

function actionItems(row: any) {
  const result = [];

  if (canEdit.value) {
    result.push([{
      label: "Edit",
      click: () => {
        editEventCategory.value = row;
        editEventCategoryModalOpen.value = true;
      }
    }]);
  }

  if (row.createdBy.firstName && canDelete.value) {
    result.push([{
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        editEventCategory.value = row;
        deleteEventCategoryModalOpen.value = true;
      }
    }]);
  }

  return result;
}

// function onEdit(index: number) {
//   console.log("edit", index);
//   editEventType.value = eventTypes.value[index]!;
//   editEventTypeModalOpen.value = true;
// }
//
// function onDelete(row: any) {
//   console.log("delete row", row);
// }

async function onRefresh() {
  page.value = 1;
  editEventCategory.value = null;
  await refresh();
}

const resultsLabel = computed(() => formatResultLabel(count.value, limit.value));
</script>

<template>
  <UDashboardPanel>
    <UDashboardToolbar>
      <template #left>
        <UButton
          icon="i-heroicons-plus"
          @click="createEventCategoryModalOpen = true"
        >
          Add category
        </UButton>
      </template>
      <template #right>
        <div class="flex items-center gap-4">
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
      :rows="eventCategories"
      :columns="columns"
      :loading="status === 'pending'"
      sort-mode="manual"
      class="w-full"
      :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
    >
      <template #createdAt-data="{ row }">
        <UTooltip :text="formatDate(row.createdAt, 'do MMM, yyyy @ HH:mm')">
          {{ timeAgo(row.createdAt) }}
        </UTooltip>
      </template>

      <template #color-data="{ row }">
        <UBadge
          :color="row.color"
          variant="subtle"
        >
          {{ capitalize(row.color) }}
        </UBadge>
      </template>

      <template #createdBy-data="{ row }">
        <div
          class="flex items-center gap-2"
        >
          <template v-if="row.createdBy.firstName && row.createdBy.lastName">
            <UAvatar size="xs" />
            <span class="font-medium text-gray-900">{{ row.createdBy.firstName }} {{ row.createdBy.lastName }}</span>
          </template>
        </div>
      </template>

      <template #actions-data="{ row }">
        <div class="flex justify-end">
          <UDropdownGroup :items="actionItems(row)" />
        </div>
      </template>
    </UTable>

    <LazyAdminEventsCategoryDeleteModal
      v-if="editEventCategory?.id"
      :id="editEventCategory.id"
      v-model:open="deleteEventCategoryModalOpen"
      @deleted="onRefresh"
    />

    <LazyAdminEventsCategoryCreateModal
      v-model:open="createEventCategoryModalOpen"
      @created="onRefresh"
    />

    <LazyAdminEventsCategoryEditModal
      v-if="editEventCategory?.id"
      :id="editEventCategory.id"
      v-model:open="editEventCategoryModalOpen"
      :state="editEventCategory"
      @edited="onRefresh"
    />
  </UDashboardPanel>
</template>

<style scoped>

</style>

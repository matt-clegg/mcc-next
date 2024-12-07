<script setup lang="ts">
import { computedAsync } from "@vueuse/core";

definePageMeta({
  layout: "admin",
  middleware: "admin"
});

useSeoMeta({
  title: "Event types"
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

const createEventTypeModalOpen = ref(false);
const editEventTypeModalOpen = ref(false);
const deleteEventTypeModalOpen = ref(false);
const editEventType = ref<EventType | null>(null);

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
  data: eventTypes,
  count,
  status,
  refresh
} = await useDataList<EventType>("/api/admin/events/types", { page, limit, sort: sortValue, fields });

const canEdit = computedAsync(async () => await allows(canEditEventType));
const canDelete = computedAsync(async () => await allows(canDeleteEventType));

function actionItems(row: any) {
  const result = [];

  if (canEdit.value) {
    result.push([{
      label: "Edit",
      click: () => {
        editEventType.value = row;
        editEventTypeModalOpen.value = true;
      }
    }]);
  }

  if (row.createdBy.firstName && canDelete.value) {
    result.push([{
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        editEventType.value = row;
        deleteEventTypeModalOpen.value = true;
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
  editEventType.value = null;
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
          @click="createEventTypeModalOpen = true"
        >
          Add event type
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
      :rows="eventTypes"
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
            <span class="text-gray-900 font-medium">{{ row.createdBy.firstName }} {{ row.createdBy.lastName }}</span>
          </template>
        </div>
      </template>

      <template #actions-data="{ row }">
        <div class="flex justify-end">
          <UDropdownGroup :items="actionItems(row)" />
        </div>
      </template>
    </UTable>

    <LazyAdminEventsTypeDeleteModal
      v-if="editEventType?.id"
      :id="editEventType.id"
      v-model:open="deleteEventTypeModalOpen"
      @deleted="onRefresh"
    />

    <LazyAdminEventsTypeCreateModal
      v-model:open="createEventTypeModalOpen"
      @created="onRefresh"
    />

    <LazyAdminEventsTypeEditModal
      v-if="editEventType?.id"
      :id="editEventType.id"
      v-model:open="editEventTypeModalOpen"
      :state="editEventType"
      @edited="onRefresh"
    />
  </UDashboardPanel>
</template>

<style scoped>

</style>

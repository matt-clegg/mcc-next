<script setup lang="ts">
const { data: folders, refresh, status } = await useFetch("/api/folders");

const columns = [
  {
    key: "id",
    label: "id"
  },
  {
    key: "name",
    label: "Name"
  },
  {
    key: "path",
    label: "Path"
  },
  {
    key: "parent",
    label: "Parent"
  },
  {
    key: "actions"
  }
];

async function deleteFolder(id: string) {
  console.log("delete folder", id);
  try {
    await $fetch(`/api/folders/${id}`, {
      method: "DELETE"
    });
    await refresh();
  }
  catch (err: any) {
    console.error("Error deleting folder", err);
  }
}

function actionItems(row: any) {
  return [[
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: async () => await deleteFolder(row.id)
    }
  ]];
}

const newFolderName = ref("");
const newFolderPath = ref("");
const newFolderParent = ref<string| undefined>(undefined);

async function addFolder() {
  if (!newFolderName.value || !newFolderPath.value) {
    console.error("Invalid folder name or path");
    return false;
  }

  try {
    await $fetch("/api/folders", {
      method: "POST",
      body: {
        name: newFolderName.value,
        path: newFolderPath.value,
        parent: newFolderParent.value
      }
    });

    await refresh();
    newFolderName.value = "";
    newFolderPath.value = "";
    newFolderParent.value = undefined;
  }
  catch (err) {
    console.error("Error adding folder", err);
  }
}
</script>

<template>
  <u-container class="pt-10 space-y-10">
    <u-card>
      <u-table
        :loading="status === 'pending'"
        :rows="folders"
        :columns="columns"
      >
        <template #actions-data="{ row }">
          <u-dropdown :items="actionItems(row)">
            <u-button
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </u-dropdown>
        </template>
      </u-table>
    </u-card>

    <u-card>
      <u-input
        v-model="newFolderName"
        placeholder="Name"
      />
      <u-input
        v-model="newFolderPath"
        placeholder="Path"
      />
      <u-input
          v-model="newFolderParent"
          placeholder="Parent"
      />
      <u-button @click="addFolder">
        Add folder
      </u-button>
    </u-card>
    <u-button to="/">
      Back
    </u-button>
  </u-container>
</template>

<style scoped>

</style>

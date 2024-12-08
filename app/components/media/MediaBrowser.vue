<script setup lang="ts">
const props = defineProps<{
  folder?: string;
}>();

const sortOptions = [
  {
    label: "Name",
    value: "name"
  },
  {
    label: "Date added",
    value: "date"
  }
];
//
// const sortOption = ref(sortOptions[1]);
// const sortDir = ref(true);

const currentFolder = ref<string | undefined>(props.folder);
const previousFolder = ref<string | undefined>(undefined);

// const sortValue = computed(() => {
//   if (sortOption.value) {
//     const prefix = sortDir.value ? "-" : "";
//     return prefix + sortOption.value.value;
//   }
//   return undefined;
// });

const { data, status, refresh } = await useFetch<{
  assets: Asset[];
  folders: Folder[];
  currentPath: string;
}>("/api/assets/browse", {
  lazy: true,
  query: {
    // sort: sortValue,
    folder: currentFolder
  },
  default: () => ({ assets: [], folders: [], currentPath: "" })
});

const assets = computed(() => data.value.assets);
const folders = computed(() => data.value.folders);
const paths = computed(() => data.value.paths);

// const { data: images, refresh: refreshAssets } = await useFetch("/api/assets", {
//   query: {
//     sort: sortValue,
//     folder: currentFolder
//   }
// });

// const { data: folders, refresh: refreshFolders } = await useFetch("/api/folders", {
//   query: {
//     parent: currentFolder
//   }
// });

const combinedAssets = computed(() => {
  const result: Asset[] = [];

  if (folders.value?.length) {
    result.push(...folders.value.map(f => ({
      id: f.id,
      filename: f.name,
      mimeType: "folder",
      size: 0,
      owner: null,
      folder: f.parent,
      isImage: false,
      createdAt: new Date(f.createdAt)
    })));
  }

  if (assets.value?.length) {
    result.push(...assets.value);
  }

  return result;
});

async function onSelect(assetId: string) {
  const asset = combinedAssets.value.find(a => a.id === assetId);
  if (asset) {
    const isFolder = asset.mimeType === "folder";
    console.log("is folder", isFolder);
    if (isFolder) {
      previousFolder.value = currentFolder.value;
      currentFolder.value = asset.id;

      await refresh();
    }
  }
}

function selectBreadcrumbFolder(name: string) {
  const folder = folders.value?.find(f => f.name === name);
  console.log("FOLDER", folder);
}

const breadcrumbLinks = computed(() => {
  // const result = [
  //   {
  //     label: "Root"
  //   }
  // ];
  //
  // if (currentFolder.value) {
  //   const folder = folders.value?.find(f => f.parent === currentFolder.value);
  //   if (folder) {
  //     const parts = folder.path.split("/");
  //     result.push(...parts.map(p => ({
  //       label: p
  //     })));
  //   }
  // }
  //
  // return result;

  // return path.value.split("/").map(p => ({
  //   label: p,
  //   click: () => selectBreadcrumbFolder(p)
  // }));

  return [{
    label: "root"
  }];
});

async function deleteAsset(assetId: string) {
  try {
    await $fetch(`/api/assets/${assetId}`, {
      method: "DELETE"
    });

    await refresh();
  }
  catch (err: any) {
    handleFetchError(err);
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2 items-center">
      <UBreadcrumb
        divider="/"
        :links="breadcrumbLinks"
      />
      <UButton
        v-if="currentFolder"
        label="Back"
        icon="i-heroicons-arrow-long-left"
        variant="ghost"
        @click="currentFolder = previousFolder"
      />
    </div>
    <div class="sm:h-[600px] overflow-y-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
        <template v-if="status === 'pending'">
          <div
            v-for="index in 9"
            :key="index"
          >
            <USkeleton class="w-full h-[70px] sm:h-[269px]" />
          </div>
        </template>
        <div
          v-for="asset in combinedAssets"
          v-else
          :key="asset.id"
          class="cursor-pointer"
        >
          <MediaPreview
            :asset="asset"
            @select="onSelect"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

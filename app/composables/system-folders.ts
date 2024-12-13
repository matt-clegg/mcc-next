export async function useSystemFolders() {
  const folders = ref<Folder[] | null>(null);

  const loadFolders = async () => {
    const { data } = await useFetch<Folder[]>("/api/folders/system", {
      default: () => null
    });

    return data.value;
  };

  if (folders.value === null) {
    folders.value = await loadFolders();
  }

  function getSystemFolderByName(name: string) {
    if (!folder.value) {
      return null;
    }

    return folders.value.find(f => f.name === name);
  }

  return {
    folders,
    getSystemFolderByName
  };
}

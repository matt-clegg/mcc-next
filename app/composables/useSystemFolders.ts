export async function useSystemFolders() {
  const folders = ref<Folder[] | null>( null );

  const loadFolders = async () => {
    const { data } = await useFetch( "/api/folders/system", {} );

    return data.value;
  };

  if ( folders.value === null ) {
    folders.value = await loadFolders();
  }
  
  return {
    folders,
  };
}

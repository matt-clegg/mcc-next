class UploadableFile {
  file: File;
  id: string;
  url: string;
  status: string | null;

  constructor(file: File) {
    this.file = file;
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.url = URL.createObjectURL(file);
    this.status = null;
  }
}

export function useFiles() {
  const files = ref<UploadableFile[]>([]);

  function addFiles(newFiles: FileList) {
    const newUploadableFiles = [...newFiles]
      .map(file => new UploadableFile(file))
      .filter(file => !fileExists(file.id));
    files.value = files.value.concat(newUploadableFiles);
  }

  function fileExists(fileId: string) {
    return files.value.some(({ id }) => id === fileId);
  }

  function removeFile(file: UploadableFile) {
    const index = files.value.indexOf(file);
    if (index > -1) {
      files.value.splice(index, 1);
    }
  }

  async function uploadFile(file: UploadableFile, folderId: string | undefined = undefined) {
    const formData = new FormData();
    formData.append("file", file.file);

    file.status = "loading";
    try {
      let url = `/api/assets`;

      if (folderId) {
        url += `?folder=${encodeURIComponent(folderId)}`;
      }
      const asset = await $fetch(url, {
        method: "POST",
        body: formData
      });
      file.status = "success";

      return asset;
    }
    catch (err: any) {
      console.error("Error uploading file", err);
      file.status = "error";
    }

    return null;
  }

  return {
    files,
    addFiles,
    removeFile,
    uploadFile
  };
}

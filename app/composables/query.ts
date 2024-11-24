import { refDebounced } from "@vueuse/core";

export function usePagination() {
  const page = ref(1);
  const limit = ref(20);

  return {
    page,
    limit
  };
}

export function useSort() {
  const sortConfig = ref<{ column: string; direction: "desc" | "asc" }>();

  const sortValue = computed(() => {
    if (!sortConfig.value?.column) {
      return undefined;
    }

    return (sortConfig.value.direction === "desc" ? "-" : "") + sortConfig.value.column;
  });

  return {
    sortConfig,
    sortValue
  };
}

export function useQuery() {
  const q = ref();
  const qDebounced = refDebounced(q, 500);

  return {
    q,
    qDebounced

  };
}

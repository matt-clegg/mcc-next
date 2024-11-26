export async function useDataList<T>(url: string, qDebounced: Ref<string>, page: Ref<number>, limit: Ref<number>, sortValue: Ref<string | undefined>) {
  const query = computed(() => ({
    q: qDebounced.value,
    page: page.value,
    limit: limit.value,
    sort: sortValue.value
  }));

  const { data, status, refresh } = await useFetch<Paginated<T[]>>(url, {
    query,
    default: () => ({ data: [], count: 0 })
  });

  const result = computed(() => data.value.data);
  const count = computed(() => data.value.count);

  return {
    status,
    refresh,
    data: result,
    count
  };
}

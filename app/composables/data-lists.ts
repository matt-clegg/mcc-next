export type DataListOptions = {
  q?: Ref<string>;
  page?: Ref<number>;
  limit?: Ref<number>;
  sort?: Ref<string | undefined>;
  fields?: Ref<string[]>;
};

export async function useDataList<T>(url: string, opts: DataListOptions = {}) {
  const query = computed(() => ({
    q: opts.q?.value ?? undefined,
    page: opts.page?.value ?? undefined,
    limit: opts.limit?.value ?? undefined,
    sort: opts.sort?.value ?? undefined,
    fields: opts.fields?.value ?? undefined
  }));

  const { data, status, refresh } = await useFetch<Paginated<T[]>>(url, {
    query,
    deep: false,
    default: () => ({ data: [], count: 0 }),
    onResponseError({ error }) {
      handleFetchError(error);
    }
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

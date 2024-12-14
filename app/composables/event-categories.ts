export async function useEventCategories() {
  const categories = useState<EventCategory[]>("event-categories", () => []);

  if (!categories.value?.length) {
    const { data } = await useFetch<EventCategory[]>("/api/events/categories", {
      default: () => []
    });
    categories.value = data.value;
  }

  return categories;
}

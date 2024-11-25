export function useErrorToast(title: string, description?: string) {
  const toast = useToast();

  toast.add({
    title,
    description,
    icon: "i-heroicons-exclamation-circle",
    color: "red"
  });
}

export function useSuccessToast(title: string) {
  const toast = useToast();
  toast.add({
    title,
    icon: "i-heroicons-check-circle",
    color: "green"
  });
}

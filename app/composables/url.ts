export function useLoginUrl() {
  const route = useRoute();

  return computed(() => {
    const path = route.fullPath;
    if (path === "/" || path.startsWith("/login")) {
      return "/login";
    }

    return `/login?redirect=${encodeURIComponent(path)}`;
  });
}

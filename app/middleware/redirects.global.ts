export default defineNuxtRouteMiddleware(async (to) => {
  const nuxtApp = useNuxtApp();
  if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
    return;
  }

  const target = to.path;

  if (target === "/") {
    return;
  }

  if (target.startsWith("/api") || target.startsWith("/_assets")) {
    return;
  }

  const redirect = await $fetch<{ to: string; responseCode: number } | undefined>(`/api/redirects/${target}`);

  if (redirect) {
    return navigateTo(redirect.to, {
      redirectCode: redirect.responseCode
    });
  }
});

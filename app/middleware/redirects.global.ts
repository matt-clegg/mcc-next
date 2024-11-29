export default defineNuxtRouteMiddleware(async (to) => {
  const nuxtApp = useNuxtApp();
  if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
    return;
  }

  const target = to.path;

  if (target === "/") {
    return;
  }

  const ignorePaths = [
    "/_assets",
    "/admin"
  ];

  if (ignorePaths.some(path => target.startsWith(path))) {
    return;
  }

  const redirect = await $fetch<{ to: string; responseCode: number } | undefined>(`/api/redirects?path=${target}`);

  if (redirect) {
    return navigateTo(redirect.to, {
      redirectCode: redirect.responseCode
    });
  }
});

export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn } = useUserSession();

  if (!loggedIn.value) {
    const path = to.fullPath;
    return navigateTo(`/login?redirect=${encodeURIComponent(path)}`);
  }

  const userIsAdmin = await allows(isAdmin);

  if (!userIsAdmin) {
    return navigateTo("/");
  }
});

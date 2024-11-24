export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn } = useUserSession();

  if (!loggedIn.value) {
    return navigateTo("/login");
  }

  const userIsAdmin = await allows(isAdmin);

  if (!userIsAdmin) {
    return navigateTo("/");
  }
});

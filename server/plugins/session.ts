export default defineNitroPlugin(() => {
  sessionHooks.hook("fetch", async (session) => {
    if (session.user) {
      console.log("updating last access");
      const now = new Date().toISOString();
      session.user.lastAccess = now;
      session.user = await updateUser(session.user.id, {
        lastAccess: now
      });
    }
  });
});

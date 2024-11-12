export default eventHandler((event) => {
  const path = getRouterParam(event, "path");

  return {
    name: "Page name",
    slug: "page-slug",
    path
  };
});

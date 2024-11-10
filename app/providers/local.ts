import { joinURL } from "ufo";
import type { ProviderGetImage } from "@nuxt/image";
import { createOperationsGenerator } from "#image";

const operationsGenerator = createOperationsGenerator({
  joinWith: "&"
});

export const getImage: ProviderGetImage = (
  src,
  { modifiers = {}, baseURL } = {}
) => {
  if (!baseURL) {
    // also support runtime config
    baseURL = useRuntimeConfig().public.baseUrl;
  }

  const operations = operationsGenerator(modifiers);

  const url = joinURL(baseURL, "/_assets", src + (operations ? "?" + operations : ""));

  return {
    url
  };
};

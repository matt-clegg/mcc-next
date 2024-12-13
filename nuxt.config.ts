// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  extends: ["@nuxt/ui-pro"],

  modules: [
    "@nuxt/ui",
    "nuxt-auth-utils",
    "@nuxt/eslint",
    "nuxt-authorization",
    "@nuxt/test-utils/module",
    "@nuxt/image",
    "@nuxt/fonts",
    "nuxt-headlessui"
  ],

  components: [
    {
      path: "~/components"
    },
    {
      path: "~/components/ui",
      pathPrefix: false
    }
  ],

  devtools: { enabled: true },

  colorMode: {
    preference: "light"
  },

  routeRules: {
    "/_assets/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    }
  },

  future: { compatibilityVersion: 4 },
  compatibilityDate: "2024-07-30",

  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: "double",
        commaDangle: "never"
      }
    }
  },

  image: {
    providers: {
      local: {
        name: "local",
        provider: "~/providers/local.ts"
      }
    }
  }

});

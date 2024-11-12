// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "nuxt-auth-utils",
    "@nuxt/eslint",
    "nuxt-authorization",
    "@nuxt/test-utils/module",
    "@nuxt/image"
  ],

  components: [{
    path: "~/components",
    pathPrefix: false
  }],

  devtools: { enabled: true },

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

// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    files: ["**/*.vue"],
    rules: {
      "vue/component-name-in-template-casing": ["error", "PascalCase"]
    }
  }
)
  .overrideRules({
    "@typescript-eslint/no-explicit-any": "off",
    "vue/component-definition-name-casing": ["error", "PascalCase"]
  });

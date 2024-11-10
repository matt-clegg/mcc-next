// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt().overrideRules({
  "@typescript-eslint/no-explicit-any": "off"
});

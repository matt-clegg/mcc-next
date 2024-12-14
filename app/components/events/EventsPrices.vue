<script setup lang="ts">
import Dinero from "dinero.js";

const props = defineProps<{
  prices: Partial<EventPrice>[];
}>();

const { data: roles } = await useFetch("/api/roles");

function getRole(roleId: string) {
  return roles.value.find(role => role.id === roleId);
}

function formatPrice(amount?: number) {
  if (amount === undefined || amount === null) {
    return "";
  }
  let result = Dinero({ amount, currency: "GBP" }).toFormat("$0.00");

  if (result.endsWith(".00")) {
    result = result.slice(0, -3);
  }

  return result;
}

const formattedPrices = computed(() => {
  return props.prices.map(price => ({
    price: formatPrice(price.price),
    label: price.role ? "Per " + getRole(price.role).name.toLowerCase() : ""
  }));
});
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <div
      v-for="(price, index) in formattedPrices"
      :key="index"
      class="flex flex-col"
    >
      <span class="text-2xl font-bold">{{ price.price }}</span>
      <span class="text-sm text-gray-700">{{ price.label }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>

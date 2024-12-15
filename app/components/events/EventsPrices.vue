<script setup lang="ts">
import Dinero from "dinero.js";

const props = defineProps<{
  prices: Partial<EventPrice>[];
}>();

// const { data: roles } = await useFetch("/api/roles", ());

const { roles } = await useRoles();

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

const juniorPrices = computed(() => {
  const prices = props.prices.filter((p) => {
    if (!p.role) {
      return false;
    }

    const role = getRole(p.role);
    if (role) {
      if (role.alias.includes("junior")) {
        return true;
      }
    }

    return false;
  });

  return formatPrices(prices, "Per junior");
});

function formatPrices(prices: Partial<EventPrice>[], fallbackLabel: string) {
  const groupedPrices = new Map<string, { price: string; labels: Set<string> }>();

  prices.forEach((price) => {
    const formattedPrice = formatPrice(price.price);
    const label = price.role ? "Per " + getRole(price.role)!.name.toLowerCase() : "";

    if (groupedPrices.has(formattedPrice)) {
      groupedPrices.get(formattedPrice)!.labels.add(fallbackLabel);
    }
    else {
      groupedPrices.set(formattedPrice, { price: formattedPrice, labels: new Set([label]) });
    }
  });

  return Array.from(groupedPrices.values()).map(({ price, labels }) => ({
    price,
    label: labels.size > 1 ? fallbackLabel : Array.from(labels)[0]
  }));
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <!--    <pre>{{ roles }}</pre> -->
    <!--    {{ juniorPrices }} -->
    <div
      v-for="(price, index) in juniorPrices"
      :key="index"
      class="flex flex-col"
    >
      <span class="text-2xl font-bold">{{ price.price }}</span>
      <span class="text-sm text-gray-700">{{ price.label }}</span>
    </div>

    <div
      v-for="(price, index) in juniorPrices"
      :key="index"
      class="flex flex-col"
    >
      <span class="text-2xl font-bold">{{ price.price }}</span>
      <span class="text-sm text-gray-700">{{ price.label }}</span>
    </div>

    <div
      v-for="(price, index) in juniorPrices"
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

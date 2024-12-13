<script setup lang="ts">
import { ref, watch, computed } from "vue";
import Dinero from "dinero.js";

const props = defineProps<{
  modelValue?: number;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number | undefined): void;
}>();

const placeholder = computed(() => props.placeholder || "Free");

const inputValue = ref<string>("");

watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined && newVal !== null) {
    inputValue.value = formatPrice(newVal);
  }
  else {
    inputValue.value = "";
  }
}, { immediate: true });

function formatPrice(amount?: number) {
  if (amount === undefined || amount === null) {
    return "";
  }
  return Dinero({ amount, currency: "GBP" }).toFormat("0.00");
}

function toPrice(amount: number) {
  return Math.round(amount * 100);
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const parsed = parseFloat(target.value);

  if (!isNaN(parsed)) {
    inputValue.value = formatPrice(toPrice(parsed));
  }
}

function onBlur(event: Event) {
  const target = event.target as HTMLInputElement;
  const parsed = parseFloat(target.value);

  if (!isNaN(parsed)) {
    emit("update:modelValue", toPrice(parsed));
    inputValue.value = formatPrice(toPrice(parsed));
  }
  else {
    emit("update:modelValue", undefined);
    inputValue.value = "";
  }
}
</script>

<template>
  <UInput
    v-model="inputValue"
    type="number"
    :placeholder="placeholder"
    step="0.01"
    min="0"
    :ui="{
      leading: {
        padding: {
          sm: 'ps-6'
        }
      }
    }"
    @blur="onBlur"
    @input="onInput"
  >
    <template #leading>
      <span class="text-gray-500">£</span>
    </template>
  </UInput>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>

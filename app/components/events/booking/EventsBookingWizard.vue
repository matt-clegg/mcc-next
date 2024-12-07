<script setup lang="ts">
import {
  EventBookingWizardUserStep
} from "#components";

const steps = [
  {
    component: EventBookingWizardUserStep
  }
];

const currentStep = computed(() => steps.value[currentStepIndex.value]);
</script>

<template>
  <div />
</template>

<style scoped>

</style>

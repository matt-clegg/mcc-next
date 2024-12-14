<script setup lang="ts">
import {
  EventsWizardStepType,
  EventsWizardStepCompliance,
  EventsWizardStepBasics,
  EventsWizardStepPricing,
  EventsWizardStepSingleDate,
  EventsWizardStepRecurring
} from "#components";
import type { WizardStep } from "~/types/wizard";

const { data: roles } = await useFetch("/api/roles", {
  default: () => []
});

const props = defineProps<{
  events?: EventItem[];
}>();

const {
  newEvent
} = useEventWizard();

// const newEvent = ref(initialEventItem());

const isEditMode = ref(false);

const steps = computed<WizardStep[]>(() => {
  const result: WizardStep[] = [];

  if (!isEditMode.value) {
    result.push({
      id: "type",
      component: EventsWizardStepType
    });
  }

  result.push(
    {
      id: "compliance",
      component: EventsWizardStepCompliance
    },
    {
      id: "basics",
      component: EventsWizardStepBasics
    },
    {
      id: "pricing",
      component: EventsWizardStepPricing
    }
  );

  if (newEvent.value.occurrenceType === "single") {
    result.push({
      id: "single",
      component: EventsWizardStepSingleDate
    });
  }
  else if (newEvent.value.occurrenceType === "multi") {

  }
  else if (newEvent.value.occurrenceType === "recurring") {
    result.push({
      id: "recurring",
      component: EventsWizardStepRecurring
    });
  }

  return result;
});

const currentStepIndex = ref(0);
const currentStep = computed(() => steps.value[currentStepIndex.value]!);
const isFirstStep = computed(() => currentStepIndex.value === 0);
const isLastStep = computed(() => currentStepIndex.value === steps.value.length - 1);

async function onSubmit() {
  try {
    if (isEditMode.value) {
      await updateEvent();
    }
    else {
      await createEvent();
    }
  }
  catch (err: any) {
    handleFetchError(err);
  }
}

function onBack() {
  currentStepIndex.value -= 1;

  if (currentStep.value.disabled) {
    onBack();
  }
}

async function onNext() {
  console.log("next");
  if (!isLastStep.value) {
    currentStepIndex.value += 1;

    if (currentStep.value.disabled) {
      await onNext();
    }
  }
  else {
    await onSubmit();
  }
}

async function createEvent() {
  try {
    await $fetch("/api/events", {
      method: "POST",
      body: newEvent.value
    });
  }
  catch (err: any) {
    handleFetchError(err);
  }
}

async function updateEvent() {
  const id = 123;
  await $fetch(`/api/events/${id}`, {
    method: "POST"
  });
}
</script>

<template>
  <div class="mt-12 space-y-8">
    <h1 class="text-center text-2xl font-bold">
      {{ isEditMode ? "Editing event" : "Create new event" }}
    </h1>
    <div class="m-auto max-w-2xl">
      <EventsWizardSteps
        v-model="currentStepIndex"
        :steps="steps"
      />
    </div>
    <div class="m-auto max-w-xl space-y-8 px-4 py-5 sm:p-6">
      <component
        :is="currentStep.component"
        v-model="newEvent"
        :is-first-step="isFirstStep"
        :is-last-step="isLastStep"
        :roles="roles"
        @back="onBack"
        @next="onNext"
      />
    </div>
  </div>
</template>

<style scoped>

</style>

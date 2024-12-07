<script setup lang="ts">
import {
  EventsWizardStepType,
  EventsWizardStepCompliance,
  EventsWizardStepBasics
} from "#components";
import type { WizardStep } from "~/types/wizard";

const props = defineProps<{
  events?: EventItem[];
}>();

const newEvent = ref(initialEventItem());

const isEditMode = ref(false);

const steps = computed(() => {
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
    }
  );

  return result;
});

const currentStepIndex = ref(0);
const currentStep = computed(() => steps.value[currentStepIndex.value]);
const currentStepIsLast = computed(() => currentStepIndex.value === steps.value.length - 1);

function initialEventItem() {
  if (props.events?.length) {
    return props.events[0];
  }
  return {};
}

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

async function createEvent() {
  await $fetch("/api/events", {
    method: "POST"
  });
}

async function updateEvent() {
  const id = 123;
  await $fetch(`/api/events/${id}`, {
    method: "POST"
  });
}
</script>

<template>
  <div class="space-y-8 mt-12">
    <h1 class="text-2xl font-bold text-center">
      {{ isEditMode ? "Editing event" : "Create new event" }}
    </h1>
    <div class="m-auto max-w-2xl">
      <EventsWizardSteps
        v-model="currentStepIndex"
        :steps="steps"
      />
    </div>
    <div class="m-auto max-w-xl space-y-8">
      <component
        :is="currentStep.component"
        v-model="newEvent"
      >
        <EventsWizardControls
          :event="newEvent"
          :current-step-index="currentStepIndex"
          :current-step-is-last="currentStepIsLast"
          :is-edit-mode="isEditMode"
          :on-submit="onSubmit"
        />
      </component>
    </div>
  </div>
</template>

<style scoped>

</style>

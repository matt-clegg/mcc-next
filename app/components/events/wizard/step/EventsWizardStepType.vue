<script setup lang="ts">
import { z } from "zod";

const emits = defineEmits(["back", "next"]);

defineProps<{
  isFirstStep: boolean;
}>();

const newEvent = defineModel<EventWizardItem>({ required: true });
const templateSelected = ref(false);

type EventType = {
  value: EventOccurrenceType;
  label: string;
  description: string;
};

const eventTypes: EventType[] = [
  {
    value: "single",
    label: "Single event",
    description: "An event that could last an hour to multiple days, like an open day or a trip"
  },
  {
    value: "multi",
    label: "Multi-day event",
    description: "An event that occurs over multiple days, like a beginners course"
  },
  {
    value: "recurring",
    label: "Recurring event",
    description: "An event that occurs multiple times, like the pool sessions"
  }
];

const schema = z.object({
  occurrenceType: z.string({ message: "Event type is required" })
});

function isChecked(eventType: EventType) {
  return newEvent.value.occurrenceType === eventType.value;
}

function onSubmit() {
  emits("next");
}

function onBack() {
  emits("back");
}
</script>

<template>
  <div class="space-y-6">
    <p>What type of event would you like to create?</p>

    <UForm
      class="space-y-6"
      :state="newEvent"
      :schema="schema"
      @submit="onSubmit"
    >
      <UFormGroup name="occurrenceType">
        <div class="-space-y-px">
          <URadio
            v-for="(eventType, index) in eventTypes"
            :key="eventType.value"
            v-model="newEvent.occurrenceType"
            v-bind="eventType"
            :ui="{
              container: 'ml-4 mt-4'
            }"
            :class="[
              index === 0 ? 'rounded-t-md' : '',
              index === eventTypes.length - 1 ? 'rounded-b-md' : '',
              isChecked(eventType) ? 'border-primary-200 bg-primary-50 z-10' : 'border-gray-200',
              templateSelected ? 'opacity-60' : 'cursor-pointer',
              'relative flex border']"
          >
            <template #label>
              <div class="cursor-pointer py-4 pr-4">
                <span :class="[isChecked(eventType) ? 'text-primary-900' : 'text-gray-900', 'text-sm font-semibold']">
                  {{ eventType.label }}
                </span>
                <p :class="[isChecked(eventType) ? 'text-primary-700' : 'text-gray-500', 'text-sm']">
                  {{ eventType.description }}
                </p>
              </div>
            </template>
          </URadio>
        </div>
      </UFormGroup>

      <hr>

      <div class="flex flex-row-reverse justify-between gap-2">
        <UButton type="submit">
          Next
        </UButton>
        <UButton
          v-if="!isFirstStep"
          @click="onBack"
        >
          Back
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<style scoped>

</style>

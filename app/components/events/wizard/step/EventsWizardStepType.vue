<script setup lang="ts">
import { z } from "zod";

const eventItem = defineModel<EventItem>({ required: true });
const templateSelected = ref(false);

type EventType = {
  id: EventOccurrenceType;
  name: string;
  description: string;
};

const eventTypes: EventType[] = [
  {
    id: "single",
    name: "Single event",
    description: "An event that could last an hour to multiple days, like an open day or a trip"
  },
  {
    id: "multi",
    name: "Multi-day event",
    description: "An event that occurs over multiple days, like a beginners course"
  },
  {
    id: "recurring",
    name: "Recurring event",
    description: "An event that occurs multiple times, like the pool sessions"
  }
];

const selected = ref<EventType | undefined>(eventTypes.find(t => t.id === eventItem.value.occurrenceType));

const schema = z.object({
  type: z.string()
});

const validator = useValidator(schema, eventItem);
</script>

<template>
  <div class="space-y-6">
    <strong>Event type</strong>

    <p>Please select the type of event you'd like to create:</p>

    <HeadlessRadioGroup
      v-model="selected"
      by="id"
    >
      <HeadlessRadioGroupLabel class="sr-only">
        Event types
      </HeadlessRadioGroupLabel>
      <div class="-space-y-px rounded-md bg-white">
        <HeadlessRadioGroupOption
          v-for="(eventType, index) in eventTypes"
          :key="eventType.id"
          v-slot="{ checked, active }"
          :disabled="templateSelected"
          as="template"
          :value="eventType"
        >
          <div
            :class="[
              index === 0 ? 'rounded-tl-md rounded-tr-md' : '',
              index === eventTypes.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
              checked ? 'z-10 border-indigo-200 bg-indigo-50' : 'border-gray-200',
              templateSelected ? 'opacity-60' : 'cursor-pointer',
              'relative flex border p-4 focus:outline-none']"
          >
            <span
              :class="[checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-indigo-600' : '', 'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center']"
              aria-hidden="true"
            >
              <span class="rounded-full bg-white w-1.5 h-1.5" />
            </span>
            <span class="ml-3 flex flex-col">
              <HeadlessRadioGroupLabel
                as="span"
                :class="[checked ? 'text-indigo-900' : 'text-gray-900', 'block text-sm font-medium']"
              >{{
                eventType.name
              }}</HeadlessRadioGroupLabel>
              <HeadlessRadioGroupDescription
                as="span"
                :class="[checked ? 'text-indigo-700' : 'text-gray-500', 'block text-sm']"
              >{{
                eventType.description
              }}</HeadlessRadioGroupDescription>
            </span>
          </div>
        </HeadlessRadioGroupOption>
      </div>
    </HeadlessRadioGroup>

    <EventsWizardValidationMessages :validator="validator" />

    <div class="footer">
      <UDivider class="mb-6" />
      <slot v-bind="{ validator }" />
    </div>
  </div>
</template>

<style scoped>

</style>

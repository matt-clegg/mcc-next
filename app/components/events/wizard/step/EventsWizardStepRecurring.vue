<script setup lang="ts">
import { format, addHours } from "date-fns";
import { RRule, type Frequency } from "rrule";

const emits = defineEmits(["back", "next"]);

const newEvent = defineModel<EventWizardItem>({ required: true });

const until = ref();
const occurrences = ref(1);
const frequencyInterval = ref(1);

const repeatingEvent = ref(false);

const endTypes = ["End after", "Until", "Indefinitely"];
const endType = ref(endTypes[0]);

const rrule = computed(() => {
  return new RRule({
    freq: frequencies.value.find(f => f.value === frequency.value)!.freq,
    interval: frequencyInterval.value,
    dtstart: newEvent.value.startDate,
    tzid: "Europe/London",
    count: endType.value === "End after" ? occurrences.value : undefined,
    until: endType.value === "Until" ? until.value : undefined
  });
});

type FrequencyType = {
  value: string;
  label: string;
  freq: Frequency;
};

const frequencies = computed<FrequencyType[]>(() => {
  return [
    {
      value: "day",
      freq: RRule.DAILY,
      label: pluralize("Day", frequencyInterval.value)
    },
    {
      value: "weekly",
      freq: RRule.WEEKLY,
      label: pluralize("Week", frequencyInterval.value)
    },
    {
      value: "monthly",
      freq: RRule.MONTHLY,
      label: pluralize("Month", frequencyInterval.value)
    },
    {
      value: "yearly",
      freq: RRule.YEARLY,
      label: pluralize("Year", frequencyInterval.value)
    }
  ];
});

const frequency = ref(frequencies.value[1]!.value);

function onSubmit() {
  if (repeatingEvent.value) {
    newEvent.value.rrule = rrule.value.toString();
  }

  emits("next");
}

function onBack() {
  emits("back");
}
</script>

<template>
  <div class="space-y-6">
    <strong>Event dates</strong>

    <pre class="break-words">{{ rrule }}</pre>

    <UForm
      class="space-y-6"
      :state="newEvent"
      @submit="onSubmit"
    >
      <div class="space-y-3">
        <div class="flex flex-row gap-2 w-full">
          <UFormGroup
            label="Start date"
            class="w-full"
          >
            <DatePicker
              v-model="newEvent.startDate"
              mode="date"
              :placeholder="format(new Date(), 'd MMM, yyy')"
            />
          </UFormGroup>

          <UFormGroup
            label="Start time"
            class="w-full"
          >
            <TimePicker
              v-model="newEvent.startDate"
              :placeholder="format(new Date(), 'HH:mm')"
            />
          </UFormGroup>
        </div>

        <div class="flex flex-row gap-2 w-full">
          <UFormGroup
            label="End date"
            class="w-full"
          >
            <DatePicker
              v-model="newEvent.endDate"
              mode="date"
              :placeholder="format(new Date(), 'd MMM, yyy')"
            />
          </UFormGroup>

          <UFormGroup
            label="End time"
            class="w-full"
          >
            <TimePicker
              v-model="newEvent.endDate"
              :placeholder="format(addHours(new Date(), 1), 'HH:mm')"
            />
          </UFormGroup>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <UToggle v-model="repeatingEvent" />
        <span class="text-sm font-medium text-gray-700 flex-shrink-0">Repeating event</span>
      </div>

      <template v-if="repeatingEvent">
        <UFormGroup>
          <div class="grid grid-cols-2 gap-2 items-center">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-700 flex-shrink-0">Repeats every</span>
              <UInput
                v-model="frequencyInterval"
                type="number"
                :min="1"
              />
            </div>
            <USelectMenu
              v-model="frequency"
              :options="frequencies"
              value-attribute="value"
            />
          </div>
        </UFormGroup>

        <UFormGroup>
          <div class="grid grid-cols-2 gap-2">
            <USelectMenu
              v-model="endType"
              :options="endTypes"
            />
            <div
              v-if="endType === 'End after'"
              class="flex items-center gap-2"
            >
              <UInput
                v-model="occurrences"
                class="flex-shrink"
                :min="1"
                type="number"
              />
              <span class="text-sm font-medium text-gray-700">occurrences</span>
            </div>
            <template v-else-if="endType === 'Until'">
              <DatePicker
                v-model="until"
                mode="date"
              />
            </template>
          </div>
        </UFormGroup>
      </template>

      <hr>

      <div class="flex justify-between gap-2">
        <UButton @click="onBack">
          Back
        </UButton>
        <UButton type="submit">
          Next
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<style scoped>

</style>

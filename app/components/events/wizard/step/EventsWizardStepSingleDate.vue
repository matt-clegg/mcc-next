<script setup lang="ts">
import { z } from "zod";
import { addHours } from "date-fns";

const emits = defineEmits(["back", "next"]);

const newEvent = defineModel<EventWizardItem>({ required: true });

const schema = z.object({
  startDate: z.date(),
  endDate: z.date()
}).refine(data => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"]
});

watch(() => newEvent.value.startDate, (val) => {
  if (!val) {
    return;
  }
  console.log("change");
  if (!newEvent.value.endDate || newEvent.value.endDate <= val) {
    newEvent.value.endDate = addHours(new Date(val), 1);
  }
});

function onSubmit() {
  emits("next");
}

function onBack() {
  emits("back");
}
</script>

<template>
  <div class="space-y-6">
    <UForm
      :state="newEvent"
      :schema="schema"
      class="space-y-6"
      @submit="onSubmit"
    >
      <div class="flex flex-col sm:flex-row gap-2 w-full">
        <UFormGroup
          name="startDate"
          label="Start date"
          class="w-full"
        >
          <DatePicker
            v-model="newEvent.startDate"
            mode="date"
          />
        </UFormGroup>

        <UFormGroup
          label="Start time"
          class="w-full"
        >
          <TimePicker v-model="newEvent.startDate" />
        </UFormGroup>
      </div>

      <div class="flex flex-col sm:flex-row gap-2 w-full">
        <UFormGroup
          name="endDate"
          label="End date"
          class="w-full"
        >
          <DatePicker
            v-model="newEvent.endDate"
            mode="date"
          />
        </UFormGroup>
        <UFormGroup
          label="End time"
          class="w-full"
        >
          <TimePicker v-model="newEvent.endDate" />
        </UFormGroup>
      </div>

      <UFormGroup name="allowBookingsAfterStart">
        <UCheckbox
          v-model="newEvent.allowBookingsAfterStart"
          label="Allow bookings after event has started"
        />
      </UFormGroup>

      <UFormGroup
        label="Last booking date"
        name="lastBookingDate"
      >
        <DatePicker
          v-model="newEvent.lastBookingDate"
        />
      </UFormGroup>

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

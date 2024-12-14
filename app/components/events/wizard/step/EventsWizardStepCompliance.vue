<script setup lang="ts">
import { z } from "zod";

const emits = defineEmits(["back", "next"]);

const newEvent = defineModel<EventWizardItem>({ required: true });

const eventCategories = await useEventCategories();

const schema = z.object({
  category: z.string(),
  confirmed: z.boolean()
}).refine(val => val.confirmed, {
  message: "Please check in order to proceed",
  path: ["confirmed"]
});

function onSubmit() {
  emits("next");
}

function onBack() {
  emits("back");
}

const selected = computed(() => {
  if (newEvent.value.category) {
    return eventCategories.value.find(e => e.id === newEvent.value.category);
  }

  return null;
});
</script>

<template>
  <div class="space-y-6">
    <strong>Important information</strong>

    <UForm
      class="space-y-6"
      :state="newEvent"
      :schema="schema"
      @submit="onSubmit"
    >
      <UFormGroup
        label="Event category"
        required
        name="category"
      >
        <USelectMenu
          v-model="newEvent.category"
          :options="eventCategories"
          value-attribute="id"
          option-attribute="name"
        >
          <template #label>
            <span
              v-if="!selected"
              class="text-gray-700"
            >Select a category</span>
            <template v-else>
              <span
                class="size-2 rounded-full"
                :class="`bg-${selected.color}-500`"
              />
              <span>{{ selected.name }}</span>
            </template>
          </template>
          <template #option="{ option: category }">
            <span
              class="size-2 rounded-full"
              :class="`bg-${category.color}-500`"
            />
            <span>{{ category.name }}</span>
          </template>
        </USelectMenu>
      </UFormGroup>

      <UFormGroup
        label="Required paddler skill level"
        hint="(optional)"
        :ui="{
          container: 'space-y-2'
        }"
      >
        <UTextarea />
        <div class="space-y-2 text-sm text-gray-700">
          <div>
            Please specify the required paddling skill level for event attendees to join.
          </div>
          <div>
            For example, "Paddlers must have their Explore award and FSRT/PSRT" or "Must be comfortable on grade 3 white
            water".
          </div>
        </div>
      </UFormGroup>

      <UFormGroup
        label="Disclaimer"
        hint="(optional)"
        :ui="{
          container: 'space-y-2'
        }"
      >
        <RichTextEditor v-model="newEvent.disclaimer" />
        <div class="space-y-2 text-sm text-gray-700">
          <div>
            Additional content that will added to the default event disclaimer. Users must agree before booking onto
            this event.
          </div>
          <div class="flex items-center justify-between">
            <span>Click to preview the disclaimer popup users will see when booking</span>
            <UButton
              variant="outline"
              size="xs"
              label="Preview"
            />
          </div>
        </div>
      </UFormGroup>

      <UFormGroup
        required
        name="confirmed"
      >
        <UCheckbox
          v-model="newEvent.confirmed"
          label="I confirm the leaders assigned to this event are competent to lead this event"
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

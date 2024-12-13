<script setup lang="ts">
import { z } from "zod";

const emits = defineEmits(["back", "next"]);

defineProps<{
  roles: Role[];
}>();

const newEvent = defineModel<EventWizardItem>({ required: true });

const schema = z.object({
  title: z.string(),
  location: z.string(),
  maxSpaces: z.coerce.number().min(1).optional(),
  minAge: z.coerce.number().min(8).optional()
});

function onSubmit() {
  emits("next");
}

function onBack() {
  emits("back");
}

const minAge = computed(() => {
  return "8";
});

watch(() => newEvent.value.bookingAllowed, (val) => {
  if (!val) {
    newEvent.value.maxSpaces = undefined;
    newEvent.value.allowedRoles = [];
    newEvent.value.minAge = undefined;
    newEvent.value.attendeesVisible = false;
  }
});
</script>

<template>
  <div class="space-y-6  ">
    <strong>Basic info</strong>

    <UForm
      class="space-y-6"
      :state="newEvent"
      :schema="schema"
      @submit="onSubmit"
    >
      <UFormGroup
        label="Event title"
        required
        name="title"
      >
        <UInput
          v-model="newEvent.title"
          required
        />
      </UFormGroup>

      <UFormGroup
        name="location"
        required
        label="Location"
      >
        <UInput
          v-model="newEvent.location"
          placeholder="Maidstone Canoe Club"
        />
      </UFormGroup>

      <UFormGroup
        name="description"
        label="Description"
      >
        <RichTextEditor v-model="newEvent.description" />
      </UFormGroup>

      <UFormGroup
        name="bookingAllowed"
      >
        <UCheckbox
          v-model="newEvent.bookingAllowed"
          label="Bookings allowed"
        />
      </UFormGroup>

      <UFormGroup
        name="maxSpaces"
        label="Max spaces"
        :ui="{
          label: {
            base: !newEvent.bookingAllowed ? 'text-gray-400' : 'text-gray-700'
          }
        }"
      >
        <UInput
          v-model.number="newEvent.maxSpaces"
          type="number"
          :disabled="!newEvent.bookingAllowed"
          placeholder="Unlimited"
          min="0"
        />
      </UFormGroup>

      <UFormGroup
        v-if="newEvent.maxSpaces !== 0"
        name="allowedRoles"
        label="Who can join this newEvent?"
        :ui="{
          label: {
            base: !newEvent.bookingAllowed ? 'text-gray-400' : 'text-gray-700'
          }
        }"
      >
        <USelectMenu
          v-model="newEvent.allowedRoles"
          :disabled="!newEvent.bookingAllowed"
          :options="roles"
          multiple
          value-attribute="id"
          option-attribute="name"
        >
          <template #label>
            <span
              v-if="newEvent.allowedRoles?.length"
              class="truncate"
            >{{ newEvent.allowedRoles.map(id => roles.find(r => r.id === id)!.name).join(", ") }}</span>
            <span
              v-else
              :class="!newEvent.bookingAllowed ? 'text-gray-400' : 'text-gray-700'"
            >Anyone can join</span>
          </template>
        </USelectMenu>
      </UFormGroup>

      <!--    <input-dropdown -->
      <!--      id="allowed-roles" -->
      <!--      v-model="newEvent.allowedRoles" -->
      <!--      multiple -->
      <!--      :options="allowedRoles" -->
      <!--      required -->
      <!--      label="Who can join this newEvent?" -->
      <!--      :v="validator.allowedRoles" -->
      <!--    /> -->

      <UFormGroup
        name="minAge"
        label="Minimum attendee age"
        :ui="{
          label: {
            base: !newEvent.bookingAllowed ? 'text-gray-400' : 'text-gray-700'
          }
        }"
      >
        <UInput
          v-model.number="newEvent.minAge"
          type="number"
          :placeholder="minAge ?? 'Any age'"
          :disabled="!newEvent.bookingAllowed"
          :min="minAge"
        />
      </UFormGroup>

      <UFormGroup
        name="attendeesVisible"
        help="When enabled, event attendees can see who else has booked onto the same event. Enable this for events like the Sunday Paddle, but not for events like Beginners Courses."
        :ui="{
          help: !newEvent.bookingAllowed ? 'text-gray-400' : 'text-gray-500'
        }"
      >
        <UCheckbox
          v-model="newEvent.attendeesVisible"
          :disabled="!newEvent.bookingAllowed"
          label="Attendees visible"
          :ui="{
            label: !newEvent.bookingAllowed ? 'text-gray-400' : 'text-gray-700'
          }"
        />
      </UFormGroup>

      <!--    <user-search -->
      <!--      v-show="canChangeLeaders" -->
      <!--      v-model="event.leaders" -->
      <!--      hide-input -->
      <!--      :label="event.paddleType === 'peer_paddle' || event.paddleType === 'other' ? 'Event organiser(s)' : 'Event leader(s)'" -->
      <!--      placeholder="Start typing the name of a club member" -->
      <!--      multiple -->
      <!--    /> -->

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

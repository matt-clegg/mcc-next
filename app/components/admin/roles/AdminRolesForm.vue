<script setup lang="ts" generic="T extends Partial<Role>">
import type { FormSubmitEvent } from "#ui/types";

const props = defineProps<{
  schema: unknown;
  state: T;
  loading: boolean;
}>();

const emits = defineEmits<{
  submit: [FormSubmitEvent<any>];
}>();

const state = reactive({
  ...props.state
});

function onSubmit(event: FormSubmitEvent<unknown>) {
  emits("submit", event);
}

const roleTypes = [
  {
    id: "public",
    label: "Public"
  },
  {
    id: "administrative",
    label: "Administrative"
  }];

const visibilityTypes = [
  {
    id: "public",
    label: "Public"
  },
  {
    id: "internal",
    label: "Internal"
  }
];
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup
      label="Name"
      name="name"
    >
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup
      label="Description"
      name="description"
    >
      <UTextarea
        v-model="state.description"
      />
    </UFormGroup>

    <UFormGroup
      label="Role type"
      name="type"
      help="Public roles are visible to all and can be given a price on events, while administrative roles are used for website management"
    >
      <USelectMenu
        v-model="state.type"
        :options="roleTypes"
        value-attribute="id"
      />
    </UFormGroup>

    <UFormGroup
      label="Visibility"
      name="visibility"
      help="Whether the role is visible to other users or not"
    >
      <USelectMenu
        v-model="state.visibility"
        :options="visibilityTypes"
        value-attribute="id"
      />
    </UFormGroup>

    <UFormGroup
      label="Priority"
      help="Used to decide which price a user will see on an event"
      name="priority"
    >
      <UInput
        v-model="state.priority"
        min="0"
        type="number"
      />
    </UFormGroup>

    <div class="flex flex-row justify-end">
      <UButton
        type="submit"
        :loading="loading"
      >
        Submit
      </UButton>
    </div>
  </UForm>
</template>

<style scoped>

</style>

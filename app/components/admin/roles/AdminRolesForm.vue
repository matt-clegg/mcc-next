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
      label="Is public"
      hint="Public roles are visible to all other users"
      name="isPublic"
    >
      <UToggle
        v-model="state.isPublic"
        label="Is public"
      />
    </UFormGroup>

    <UFormGroup
      label="Priority"
      hint="Used to decide payments"
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

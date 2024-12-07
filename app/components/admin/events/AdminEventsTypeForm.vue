<script setup lang="ts" generic="T extends Partial<EventType>">
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

// Probably need to move this somewhere shared
const colorAliases: Record<string, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  lime: "bg-lime-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  fuchsia: "bg-fuchsia-500",
  rose: "bg-rose-500",
  orange: "bg-orange-500",
  teal: "bg-teal-500",
  cyan: "bg-cyan-500",
  indigo: "bg-indigo-500"
};

const colors = Object.keys(colorAliases).map(
  alias => ({
    name: capitalize(alias),
    alias: alias
  })
);

function colorFromAlias(alias: string) {
  return colorAliases[alias];
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
      label="Colour"
      name="color"
    >
      <USelectMenu
        v-model="state.color"
        :options="colors"
        value-attribute="alias"
        placeholder="Select a colour"
      >
        <template #label>
          <template v-if="state.color">
            <span
              :class="colorFromAlias(state.color)"
              class="size-2 rounded-full"
            />
            <span class="truncate">{{ colors.find(s => s.alias === state.color)?.name }}</span>
          </template>
        </template>
        <template #option="{ option }">
          <span
            :class="colorFromAlias(option.alias)"
            class="size-2 rounded-full"
          />
          <span class="truncate">{{ option.name }}</span>
        </template>
      </USelectMenu>
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

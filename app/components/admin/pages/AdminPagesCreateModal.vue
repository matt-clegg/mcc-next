<script setup lang="ts">
import { z } from "zod";

const open = defineModel<boolean>("open", { required: true });

const loading = ref(false);

const emits = defineEmits<{
  created: [];
}>();

const createPageValidator = z.object({
  name: z.string(),
  url: z.string().optional()
});

type Schema = z.output<typeof createPageValidator>;

const state = reactive<Partial<Schema>>({
  name: undefined,
  url: undefined
});

function onSubmit() {
  console.log("submit");
  emits("created");
}
</script>

<template>
  <UDashboardModal
    v-model="open"
    title="Create page or folder"
    prevent-close
    :ui="{ width: 'sm:max-w-md' }"
  >
    <AdminPagesForm
      :state="state"
      :schema="createPageValidator"
      :loading="loading"
      @submit="onSubmit"
    />
  </UDashboardModal>
</template>

<style scoped>

</style>

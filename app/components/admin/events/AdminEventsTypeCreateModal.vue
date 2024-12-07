<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

const open = defineModel<boolean>("open", { required: true });

const loading = ref(false);

const emits = defineEmits<{
  created: [];
}>();

const state = reactive<Partial<CreateEventTypeSchema>>({
  name: undefined,
  color: undefined
});

async function onSubmit(event: FormSubmitEvent<CreateEventTypeSchema>) {
  loading.value = true;

  try {
    await $fetch("/api/admin/events/types", {
      method: "POST",
      body: event.data
    });

    emits("created");
    close();
    useSuccessToast(`Event type ${event.data.name} has been created`);
  }
  catch (err: any) {
    loading.value = false;
    handleFetchError(err);
  }
}

function close() {
  open.value = false;
}
</script>

<template>
  <UDashboardModal
    v-model="open"
    title="Create event type"
    description="Event types are used to categorize events"
    prevent-close
    :ui="{ width: 'sm:max-w-md' }"
  >
    <AdminEventsTypeForm
      :state="state"
      :schema="createEventTypeValidator"
      :loading="loading"
      @submit="onSubmit"
    />
  </UDashboardModal>
</template>

<style scoped>

</style>

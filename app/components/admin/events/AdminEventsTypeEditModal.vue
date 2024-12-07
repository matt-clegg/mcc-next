<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

const props = defineProps<{
  id: string;
  state: Partial<EditEventTypeSchema>;
}>();

const emits = defineEmits<{
  edited: [];
}>();

const open = defineModel<boolean>("open", { required: true });

const loading = ref(false);

const state = ref<Partial<EditEventTypeSchema>>({
  ...props.state
});

watch(() => props.state, (val) => {
  state.value = {
    ...val
  };
});
async function onSubmit(event: FormSubmitEvent<EditEventTypeSchema>) {
  loading.value = true;

  try {
    await $fetch(`/api/admin/events/types/${props.id}`, {
      method: "PATCH",
      body: event.data
    });

    emits("edited");
    close();
    useSuccessToast(`Event type ${event.data.name} has been edited`);
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
    title="Edit event type"
    prevent-close
    :ui="{ width: 'sm:max-w-md' }"
  >
    <AdminEventsTypeForm
      :state="state"
      :schema="editEventTypeValidator"
      :loading="loading"
      @submit="onSubmit"
    />
  </UDashboardModal>
</template>

<style scoped>

</style>

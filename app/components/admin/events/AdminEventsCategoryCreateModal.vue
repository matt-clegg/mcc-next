<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

const open = defineModel<boolean>("open", { required: true });

const loading = ref(false);

const emits = defineEmits<{
  created: [];
}>();

const state = reactive<Partial<CreateEventCategorySchema>>({
  name: undefined,
  color: undefined
});

async function onSubmit(event: FormSubmitEvent<CreateEventCategorySchema>) {
  loading.value = true;

  try {
    await $fetch("/api/admin/events/categories", {
      method: "POST",
      body: event.data
    });

    emits("created");
    close();
    useSuccessToast(`Event category ${event.data.name} has been created`);
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
    title="Create event category"
    description="Event categories are used to categorize events"
    prevent-close
    :ui="{ width: 'sm:max-w-md' }"
  >
    <AdminEventsCategoryForm
      :state="state"
      :schema="createEventCategoryValidator"
      :loading="loading"
      @submit="onSubmit"
    />
  </UDashboardModal>
</template>

<style scoped>

</style>

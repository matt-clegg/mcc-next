<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

const open = defineModel<boolean>("open", { required: true });

const loading = ref(false);

const emits = defineEmits<{
  created: [];
}>();

type Schema = CreateRoleSchema;

const state = reactive<Partial<Schema>>({
  name: undefined,
  isPublic: undefined,
  priority: undefined
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;

  try {
    await $fetch("/api/roles/", {
      method: "POST",
      body: event.data
    });

    emits("created");
    close();
    useSuccessToast(`Role ${event.data.name} has been created`);
  }
  catch (err: any) {
    handleFetchError(err);
  }
  finally {
    loading.value = false;
  }
}

function close() {
  open.value = false;
}
</script>

<template>
  <UDashboardModal
    v-model="open"
    title="Create role"
    description="A role can be assigned to users"
    prevent-close
    :ui="{ width: 'sm:max-w-md' }"
  >
    <AdminRolesForm
      :state="state"
      :schema="createRoleValidator"
      :loading="loading"
      @submit="onSubmit"
    />
  </UDashboardModal>
</template>

<style scoped>

</style>

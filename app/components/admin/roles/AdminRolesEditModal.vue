<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

const props = defineProps<{
  id: string;
  state: Partial<EditRoleSchema>;
}>();

const emits = defineEmits<{
  edited: [];
}>();

const open = defineModel<boolean>("open", { required: true });

const loading = ref(false);

const state = ref<Partial<EditRoleSchema>>({
  ...props.state
});

watch(() => props.state, (val) => {
  state.value = {
    ...val
  };
});

async function onSubmit(event: FormSubmitEvent<EditRoleSchema>) {
  loading.value = true;

  try {
    await $fetch(`/api/roles/${props.id}`, {
      method: "PATCH",
      body: event.data
    });

    emits("edited");
    close();
    useSuccessToast(`Role ${event.data.name} has been edited`);
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
    title="Edit role"
    prevent-close
    :ui="{ width: 'sm:max-w-md' }"
  >
    <AdminRolesForm
      :state="state"
      :schema="editRoleValidator"
      :loading="loading"
      @submit="onSubmit"
    />
  </UDashboardModal>
</template>

<style scoped>

</style>

<script setup lang="ts">
const props = defineProps<{
  id: string;
}>();

const emits = defineEmits(["deleted"]);

const open = defineModel<boolean>("open", { required: true });

const loading = ref(false);

async function onDelete() {
  loading.value = true;
  try {
    await $fetch(`/api/admin/events/categories/${props.id}`, {
      method: "DELETE"
    });

    emits("deleted");
    close();
    useSuccessToast("Event category has been deleted");
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
    title="Delete event category"
    description="Are you sure you want to delete this category?"
    icon="i-heroicons-exclamation-circle"
    prevent-close
    :ui="{
      width: 'sm:max-w-md',
      icon: { base: 'text-red-500 dark:text-red-400' } as any,
      footer: { base: 'ml-16' } as any
    }"
  >
    <template #footer>
      <UButton
        color="red"
        :loading="loading"
        label="Delete"
        @click="onDelete"
      />
      <UButton
        color="white"
        label="Cancel"
        @click="open = false"
      />
    </template>
  </UDashboardModal>
</template>

<style scoped>

</style>

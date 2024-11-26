<script setup lang="ts">
const props = defineProps<{
  id: string;
  state: Partial<EditPageSchema>;
}>();

const emits = defineEmits<{
  edited: [];
}>();

const open = defineModel<boolean>("open", { required: true });

const loading = ref(false);

const state = ref<Partial<EditPageSchema>>({
  ...props.state
});

watch(() => props.state, (val) => {
  state.value = {
    ...val
  };
});

function close() {
  open.value = false;
}
</script>

<template>
  <UDashboardSlideover
    v-model="open"
    title="Edit Page"
    prevent-close
  >
    <AdminPagesForm
      :state="state"
      :schema="editPageValidator"
      :loading="loading"
    />
  </UDashboardSlideover>
</template>

<style scoped>

</style>

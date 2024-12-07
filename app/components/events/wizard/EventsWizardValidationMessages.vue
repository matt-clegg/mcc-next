<script setup lang="ts">
const props = defineProps<{
  id?: string;
  validator: Validator;
}>();

const internalId = computed(() => props.id ? `${props.id}-error` : undefined);

const error = computed(() => {
  if (props.validator && props.validator.issues.value.length) {
    const issue = props.validator.issues.value[0]!;
    return issue.message;
  }

  return null;
});

const isValid = computed(() => {
  if (props.validator) {
    return !props.validator.invalid.value;
  }

  return true;
});
</script>

<template>
  <p
    v-if="!isValid"
    :id="internalId"
    class="mt-2 text-sm text-red-600"
  >
    {{ error }}
  </p>
</template>

<style scoped>

</style>

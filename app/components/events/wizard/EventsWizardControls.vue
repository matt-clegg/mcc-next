<script setup lang="ts">
const emits = defineEmits(["prev", "advance"]);

const props = defineProps<{
  event: EventItem;
  validator?: Validator;
  currentStepIndex: number;
  currentStepIsLast: boolean;
  isValid?: boolean;
  isEditMode: boolean;
  onSubmit: (() => Promise<any>);
}>();

const internalIsValid = computed(() => {
  if (props.validator) {
    return !props.validator.invalid.value;
  }

  return props.isValid;
});

const nextButtonLabel = computed(() => {
  if (props.currentStepIsLast) {
    return props.isEditMode ? "Update event" : "Create event";
  }

  return "Next";
});

const disablePrev = computed(() => props.currentStepIndex === 0);

function onPrev() {
  emits("prev");
}

function onAdvance() {
  if (props.currentStepIsLast) {
    return;
  }

  props.validator?.validate();
  if (internalIsValid.value) {
    emits("advance");
  }
}

async function submit() {
  props.validator?.validate();
  if (internalIsValid.value) {
    await props.onSubmit();
  }
}
</script>

<template>
  <div class="space-y-5">
    <!--    <alert-box -->
    <!--      v-if="showHiddenWarning" -->
    <!--      heading="Event hidden" -->
    <!--      variant="warning" -->
    <!--    > -->
    <!--      This event will remain hidden on the calendar until it has been approved. -->
    <!--    </alert-box> -->
    <div class="flex flex-row-reverse justify-between gap-2">
      <UButton
        :action="currentStepIsLast && internalIsValid ? submit : undefined"
        :keep-loading="currentStepIsLast"
        @click="onAdvance"
      >
        {{ nextButtonLabel }}
      </UButton>
      <UButton
        v-if="!disablePrev"
        :disabled="disablePrev"
        @click="onPrev"
      >
        Previous
      </UButton>
    </div>
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
const emits = defineEmits(["back", "next"]);

const props = defineProps<{
  roles: Role[];
}>();

const newEvent = defineModel<EventWizardItem>({ required: true });

const filteredRoles = computed(() => {
  if (newEvent.value.allowedRoles && newEvent.value.allowedRoles.length) {
    return props.roles.filter(s => newEvent.value.allowedRoles.includes(s.id));
  }

  return props.roles;
});

const tabs = [
  {
    key: "simple",
    label: "Simple pricing",
    icon: "i-heroicons-currency-pound"
  },
  {
    key: "advanced",
    label: "Advanced pricing",
    icon: "i-heroicons-users"
  }
];

function onSubmit() {
  emits("next");
}

function onBack() {
  emits("back");
}

function onTabChange() {
  newEvent.value.prices = {};
}
</script>

<template>
  <div class="space-y-6">
    <!--    <alert-box -->
    <!--      v-if="editMode && hasBookings" -->
    <!--      variant="error" -->
    <!--      heading="Changing the price?" -->
    <!--    > -->
    <!--      <p>If you are changing the price of this of this event, please read.</p> -->
    <!--      <p><strong>{{ existingPaymentWarning }}</strong></p> -->
    <!--      <p> -->
    <!--        <strong> -->
    <!--          If you change the price, users who book onto this event will pay the new price. Nothing will -->
    <!--          change for users who have already booked. -->
    <!--        </strong> -->
    <!--      </p> -->
    <!--      <p>If you are not changing the pricing, you may proceed as normal and ignore this warning.</p> -->
    <!--    </alert-box> -->
    <!--    <event-pricing v-model="event" /> -->

    <strong>Event pricing</strong>

    <UTabs
      :items="tabs"
      @change="onTabChange"
    >
      <template #item="{ item }">
        <UForm
          class="mt-8 space-y-6"
          :state="newEvent"
          @submit="onSubmit"
        >
          <template v-if="item.key === 'simple'">
            <p>Set the price of the event, this price will apply to all users.</p>

            <UFormGroup
              label="Event price"
              help="Leave blank to make the event free"
            >
              <UInputCurrency v-model="newEvent.prices.all" />
            </UFormGroup>
          </template>
          <template v-if="item.key === 'advanced'">
            <div class="flex flex-col gap-3">
              <p>Set specific prices for each type of user allowed to book this event, or leave inputs blank to make the event free for those users.</p>
              <p>Users with multiple roles (eg Member and Coach) will use the cheapest price.</p>
            </div>

            <UFormGroup
              v-for="role in filteredRoles"
              :key="role.alias"
              :label="role.name + ' price'"
            >
              <UInputCurrency v-model="newEvent.prices[role.id]" />
            </UFormGroup>
          </template>

          <hr>

          <div class="flex justify-between gap-2">
            <UButton @click="onBack">
              Back
            </UButton>
            <UButton type="submit">
              Next
            </UButton>
          </div>
        </UForm>
      </template>
    </UTabs>
  </div>
</template>

<style scoped>

</style>

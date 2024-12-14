<script setup lang="ts">
const props = defineProps<{
  event: EventItem;
}>();

const users = [
  {
    alt: "S M"
  },
  {
    alt: "K E"
  },
  {
    alt: "P J"
  },
  {
    alt: "M C"
  },
  {
    alt: "A H"
  },
  {
    alt: "M S"
  },
  {
    alt: "J B"
  },
  {
    alt: "J S"
  }
];

function getUi(alt: string) {
  return { background: colorFromString(alt), placeholder: "text-gray-700" };
}

const bookModalOpen = ref(false);
const viewAttendeesModalOpen = ref(false);
</script>

<template>
  <div class="flex flex-col gap-4 rounded-lg border border-gray-200 p-4">
    <!--    <div class="flex items-center gap-3"> -->
    <!--      <UIcon -->
    <!--        name="i-heroicons-calendar-days" -->
    <!--        class="size-5" -->
    <!--      /> -->
    <!--      <span class="text-gray-900 font-medium"> -->
    <!--        6th Jan, 2024 -->
    <!--      </span> -->
    <!--    </div> -->

    <!--    <div class="flex items-center gap-3"> -->
    <!--      <UIcon -->
    <!--        name="i-heroicons-clock" -->
    <!--        class="size-5" -->
    <!--      /> -->
    <!--      <span class="text-gray-900 font-medium"> -->
    <!--        8:00am - 9:00am -->
    <!--      </span> -->
    <!--    </div> -->

    <!--    <UDivider /> -->
    <EventsPrices :prices="event.prices" />

    <!--    <div class="flex flex-wrap gap-2"> -->
    <!--      <div class="flex flex-col"> -->
    <!--        <span class="text-2xl font-bold">£8</span> -->
    <!--        <span class="text-sm text-gray-700">Per junior</span> -->
    <!--      </div> -->

    <!--      <div class="flex flex-col"> -->
    <!--        <span class="text-2xl font-bold">£10</span> -->
    <!--        <span class="text-sm text-gray-700">Per coach</span> -->
    <!--      </div> -->

    <!--      <div class="flex flex-col"> -->
    <!--        <span class="text-2xl font-bold">£11</span> -->
    <!--        <span class="text-sm text-gray-700">Per member</span> -->
    <!--      </div> -->

    <!--      <div class="flex flex-col"> -->
    <!--        <span class="text-2xl font-bold">£20</span> -->
    <!--        <span class="text-sm text-gray-700">Per non-member</span> -->
    <!--      </div> -->

    <!--      <div class="flex flex-col"> -->
    <!--        <span class="text-2xl font-bold">Free</span> -->
    <!--        <span class="text-sm text-gray-700">For adults</span> -->
    <!--      </div> -->
    <!--    </div> -->

    <div class="flex items-center gap-3">
      <UIcon
        name="i-heroicons-identification"
        class="size-5"
      />
      <span>
        Members only
      </span>
    </div>

    <!--    <div class="flex items-center gap-3"> -->
    <!--      <UIcon -->
    <!--        name="i-heroicons-map-pin" -->
    <!--        class="size-5" -->
    <!--      /> -->
    <!--      <span> -->
    <!--        Maidstone Canoe Club -->
    <!--      </span> -->
    <!--    </div> -->

    <div class="flex gap-3">
      <UIcon
        name="i-heroicons-users"
        class="mt-0.5 size-5"
      />
      <div class="flex flex-col gap-2">
        <span>
          <span>
            {{ users.length }} attendees
          </span>
          <span>(4 spaces left)</span>
        </span>
        <div class="flex gap-2 rounded-xl border-none border-gray-200">
          <UAvatarGroup
            size="sm"
            :max="4"
          >
            <UAvatar
              v-for="(user, index) in users"
              :key="index"
              :alt="user.alt"
              :ui="getUi(user.alt)"
            />
          </UAvatarGroup>
          <UButton
            size="xs"
            color="primary"
            variant="ghost"
            icon="i-heroicons-eye"
            @click="viewAttendeesModalOpen = true"
          >
            View all
          </UButton>
        </div>
      </div>
    </div>

    <LazyEventsAttendeesModal v-model="viewAttendeesModalOpen" />
  </div>
</template>

<style scoped>

</style>

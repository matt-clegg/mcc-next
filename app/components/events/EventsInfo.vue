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
  <div class="p-4 border border-gray-200 rounded-lg flex flex-col gap-4">
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
        class="size-5 mt-0.5"
      />
      <div class="flex flex-col gap-2">
        <span>
          <span>
            {{ users.length }} attendees
          </span>
          <span>(4 spaces left)</span>
        </span>
        <div class="flex border-none border-gray-200 rounded-xl gap-2">
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

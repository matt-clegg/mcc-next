<script setup lang="ts">
import { format, isSameDay, isSameMonth, isSameYear } from "date-fns";

const route = useRoute();
const id = route.params.id as string;

const { data } = await useFetch<EventItem>(`/api/events/${id}`);

if (!data.value) {
  throw createError({
    statusCode: 404,
    message: "Event not found"
  });
}

const event = computed<EventItem>(() => data.value!);

const bookModalOpen = ref(false);

const lastBookingDate = computed<number | null>(() => {
  if (event.value.lastBookingDate) {
    return new Date(event.value.lastBookingDate).getTime();
  }

  return new Date(event.value.startDate).getTime();
});

const timeLeftToBook = ref<number>(0);

function updateTimeLeft() {
  if (lastBookingDate.value) {
    timeLeftToBook.value = lastBookingDate.value - Date.now();
  }
}

let interval: number | null = null;

onMounted(() => {
  if (!lastBookingDate.value) {
    return;
  }

  updateTimeLeft();

  if (timeLeftToBook.value / 1000 > 1) {
    interval = window.setInterval(() => {
      updateTimeLeft();
      if (timeLeftToBook.value / 1000 < 1 && interval !== null) {
        clearInterval(interval);
      }
    }, 1000);
  }
});

onUnmounted(() => {
  if (interval) {
    window.clearInterval(interval);
  }
});

const formattedTimeLeft = computed(() => {
  const totalSeconds = Math.max(0, Math.floor(timeLeftToBook.value / 1000));
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return days === 1 ? "1 day" : `${days} days`;
  }

  const parts = [];

  if (hours > 0) {
    parts.push(`${hours}h`);
  }

  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }

  if (seconds >= 0) {
    parts.push(`${seconds}s`);
  }

  return parts.join(" ");
});

const bookNowDisabled = computed(() => !!lastBookingDate.value && timeLeftToBook.value / 1000 < 1);
</script>

<template>
  <article class="space-y-8 pb-10 md:mt-5 lg:mt-10">
    <UContainer
      :ui="{
        base: 'hidden md:block relative min-h-72 overflow-hidden',
        constrained: 'max-w-5xl' }"
    >
      <NuxtImg
        class="w-full rounded-xl object-cover"
        src="/images/wide.jpg"
      />
      <div class="absolute inset-x-4 inset-y-0 rounded-xl bg-gradient-to-t from-black from-15% to-85% opacity-80 sm:inset-x-6 lg:inset-x-8" />

      <div class="absolute inset-4 sm:inset-6 lg:inset-8">
        <EventsHeader :event="event" />
      </div>
    </UContainer>

    <div class="relative min-h-72 overflow-hidden md:hidden">
      <div class="absolute inset-0">
        <NuxtImg
          class="size-full object-cover"
          src="/images/wide.jpg"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-black from-15% to-85% opacity-80" />

      <div class="absolute inset-x-0 inset-y-4">
        <EventsHeader :event="event" />
      </div>
    </div>

    <UContainer :ui="{ constrained: 'max-w-5xl' }">
      <div class="grid gap-6 md:grid-cols-12">
        <div class="space-y-6 md:col-span-8">
          <SanitizeHtml
            :html="event.description"
            class="prose"
          />
        </div>

        <div class="space-y-4 md:col-span-4">
          <EventsInfo :event="event" />

          <div class="relative">
            <template v-if="lastBookingDate">
              <div
                class="absolute inset-0 rounded-lg border transition-all"
                :class="timeLeftToBook / 1000 > 60 * 60 ? 'border-orange-400 bg-orange-50' : 'border-red-400 bg-red-100'"
              />
              <div
                class="relative z-10 px-3 text-center text-sm transition-all"
                :class="timeLeftToBook / 1000 > 60 * 60 ? 'text-orange-700 py-0.5' : 'text-red-800 py-1'"
              >
                <template v-if="timeLeftToBook / 1000 >= 1">
                  <strong>{{ formattedTimeLeft }}</strong> left to book
                </template>
                <template v-else>
                  Bookings closed
                </template>
              </div>
            </template>
            <div class="relative z-10">
              <UButton
                icon="i-heroicons-ticket"
                size="xl"
                class="w-full justify-center"
                :disabled="bookNowDisabled"
                @click="bookModalOpen = true"
              >
                Book now
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </UContainer>

    <!--    <div class="sticky sm:hidden bottom-0 p-4 pt-0 bg-white "> -->
    <!--      <UButton -->
    <!--        icon="i-heroicons-ticket" -->
    <!--        size="xl" -->
    <!--        class="w-full justify-center" -->
    <!--        @click="bookModalOpen = true" -->
    <!--      > -->
    <!--        Book now -->
    <!--      </UButton> -->
    <!--    </div> -->

    <LazyEventsBookingModal
      v-model="bookModalOpen"
      title="Book event"
    />
  </article>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { add } from "date-fns";

const bookModalOpen = ref(false);

const lastBookingDate = ref<number | null>(add(new Date(), { hours: 1, seconds: 10 }).getTime());
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

  const parts = [];

  if (days > 0) {
    parts.push(`${days}d`);
  }

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
  <article class="space-y-8 pb-10">
    <div class="md:col-span-8 relative overflow-hidden min-h-72 flex flex-col justify-end pb-5">
      <div class="absolute bottom-0 top-0 z-8">
        <NuxtImg
          class="w-full h-full object-cover"
          src="/images/wide.jpg"
        />
        <div class="absolute opacity-80 inset-0 bg-gradient-to-t from-15% to-85% from-black z-9 " />
      </div>

      <div class="z-10 text-white">
        <UContainer :ui="{ constrained: 'max-w-5xl' }">
          <h2 class="font-bold text-2xl md:text-3xl mb-2">
            Regular Club Paddle
          </h2>

          <div class="text-sm flex gap-3 flex-wrap">
            <div class="flex gap-2 items-center">
              <UIcon
                name="i-heroicons-map-pin"
                class="size-5"
              />
              <span>
                Maidstone Canoe Club
              </span>
            </div>

            <span>•</span>

            <div class="flex gap-2 items-center">
              <UIcon
                name="i-heroicons-calendar-days"
                class="size-5"
              />
              <span>
                6th - 12th Jan, 2024
              </span>
            </div>

            <span>•</span>

            <div class="flex gap-2 items-center">
              <UIcon
                name="i-heroicons-clock"
                class="size-5"
              />
              <span>
                8:00am - 9:00am
              </span>
            </div>
          </div>
        </UContainer>
      </div>
    </div>

    <UContainer :ui="{ constrained: 'max-w-5xl' }">
      <div class="grid lg:grid-cols-12 gap-6">
        <div class="md:col-span-8 space-y-6">
          <div class="prose">
            <p>Our regular weekly paddle sessions for members both new and experienced.</p>

            <p>
              If you're a newer member or would like some support on the water, please use the booking form below and
              one of
              our PAAs will meet you for a paddle. If you're confident in your ability to paddle independently with the
              main
              group, please don't use the booking form - just turn up - and leave the spaces for those who need it.
            </p>
          </div>
        </div>

        <div class="md:col-span-4 space-y-4">
          <!--          <div class="p-4 border border-gray-200 rounded-lg flex flex-col gap-4"> -->
          <!--            <div class="flex flex-col gap-3"> -->
          <!--              <strong>Multi-day event</strong> -->
          <!--              <p>This event occurs over multiple days.</p> -->
          <!--              <ul class="flex flex-col"> -->
          <!--                <li class="flex items-center gap-2"> -->
          <!--                  6th Jan, 2024 <small>@</small> 8:00am - 9:00am -->
          <!--                </li> -->
          <!--                <li class="flex items-center gap-2"> -->
          <!--                  10th Jan, 2024 <small>@</small> 8:00am - 9:00am -->
          <!--                </li> -->
          <!--                <li class="flex items-center gap-2"> -->
          <!--                  15th Jan, 2024 <small>@</small> 8:00am - 9:00am -->
          <!--                </li> -->
          <!--              </ul> -->
          <!--            </div> -->
          <!--          </div> -->

          <EventsInfo />

          <div class="relative">
            <template v-if="lastBookingDate">
              <div
                class="absolute inset-0 border rounded-lg transition-all"
                :class="timeLeftToBook / 1000 > 60 * 60 ? 'border-orange-400 bg-orange-50' : 'border-red-400 bg-red-100'"
              />
              <div
                class="px-3 text-center text-sm z-10 relative transition-all"
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
            <div class="z-10 relative">
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

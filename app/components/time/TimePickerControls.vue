<script setup lang="ts">
import { setHours, setMinutes } from "date-fns";

const date = defineModel<Date | null>();

function getInitialHours() {
  return date.value ? date.value.getHours() : new Date().getHours();
}

function getInitialMinutes() {
  const minutes = date.value ? date.value.getMinutes() : new Date().getMinutes();
  return Math.floor(minutes / 5) * 5;
}

const hours = ref(getInitialHours());
const minutes = ref(getInitialMinutes());

watch(hours, (val) => {
  if (!date.value) {
    date.value = new Date();
  }

  if (date.value) {
    date.value = setHours(date.value, val);
  }
});

watch(minutes, (val) => {
  if (!date.value) {
    date.value = new Date();
  }

  if (date.value) {
    date.value = setMinutes(date.value, val);
  }
});

function addHours() {
  if (hours.value < 23) {
    hours.value++;
  }
  else {
    hours.value = 0;
  }
}

function subHours() {
  if (hours.value > 0) {
    hours.value--;
  }
  else {
    hours.value = 23;
  }
}

function addMinutes() {
  if (minutes.value < 54) {
    minutes.value += 5;
  }
  else {
    minutes.value = 0;
  }
}

function subMinutes() {
  if (minutes.value > 0) {
    minutes.value -= 5;
  }
  else {
    minutes.value = 55;
  }
}

function formatValue(value: number) {
  return value < 10 ? `0${value}` : value;
}

// Press-and-Hold Functionality
const intervalIds = ref<{ [key: string]: number | null }>({
  addHours: null,
  subHours: null,
  addMinutes: null,
  subMinutes: null
});

const delay = 500;
const interval = 100;

function startPress(action: "addHours" | "subHours" | "addMinutes" | "subMinutes") {
  if (intervalIds.value[action]) return; // Prevent multiple intervals

  // Call the action immediately
  switch (action) {
    case "addHours":
      addHours();
      break;
    case "subHours":
      subHours();
      break;
    case "addMinutes":
      addMinutes();
      break;
    case "subMinutes":
      subMinutes();
      break;
    default:
      break;
  }

  // Start the interval after the initial delay
  // Store the timeout ID to clear later if needed
  intervalIds.value[action] = window.setTimeout(() => {
    intervalIds.value[action] = window.setInterval(() => {
      switch (action) {
        case "addHours":
          addHours();
          break;
        case "subHours":
          subHours();
          break;
        case "addMinutes":
          addMinutes();
          break;
        case "subMinutes":
          subMinutes();
          break;
        default:
          break;
      }
    }, interval);
  }, delay);
}

function stopPress(action: "addHours" | "subHours" | "addMinutes" | "subMinutes") {
  const id = intervalIds.value[action];
  if (id !== null) {
    clearTimeout(id);
    clearInterval(id);
    intervalIds.value[action] = null;
  }
}

onUnmounted(() => {
  Object.keys(intervalIds.value).forEach((action) => {
    const id = intervalIds.value[action as keyof typeof intervalIds.value];
    if (id !== null) {
      clearTimeout(id);
      clearInterval(id);
      intervalIds.value[action as keyof typeof intervalIds.value] = null;
    }
  });
});
</script>

<template>
  <div class="flex justify-center items-center gap-2">
    <div class="flex flex-col gap-2 items-center">
      <UButton
        icon="i-heroicons-chevron-up"
        color="white"
        :ui="{ rounded: 'rounded-full' }"
        @mousedown.prevent="startPress('addHours')"
        @touchstart.prevent="startPress('addHours')"
        @mouseup.prevent="stopPress('addHours')"
        @mouseleave.prevent="stopPress('addHours')"
        @touchend.prevent="stopPress('addHours')"
      />
      <span>
        {{ formatValue(hours) }}
      </span>
      <UButton
        icon="i-heroicons-chevron-down"
        color="white"
        :ui="{ rounded: 'rounded-full' }"
        @mousedown.prevent="startPress('subHours')"
        @touchstart.prevent="startPress('subHours')"
        @mouseup.prevent="stopPress('subHours')"
        @mouseleave.prevent="stopPress('subHours')"
        @touchend.prevent="stopPress('subHours')"
      />
    </div>

    <span>:</span>

    <div class="flex flex-col gap-2 items-center">
      <UButton
        icon="i-heroicons-chevron-up"
        color="white"
        :ui="{ rounded: 'rounded-full' }"
        @mousedown.prevent="startPress('addMinutes')"
        @touchstart.prevent="startPress('addMinutes')"
        @mouseup.prevent="stopPress('addMinutes')"
        @mouseleave.prevent="stopPress('addMinutes')"
        @touchend.prevent="stopPress('addMinutes')"
      />
      <span>{{ formatValue(minutes) }}</span>
      <UButton
        icon="i-heroicons-chevron-down"
        color="white"
        :ui="{ rounded: 'rounded-full' }"
        @mousedown.prevent="startPress('subMinutes')"
        @touchstart.prevent="startPress('subMinutes')"
        @mouseup.prevent="stopPress('subMinutes')"
        @mouseleave.prevent="stopPress('subMinutes')"
        @touchend.prevent="stopPress('subMinutes')"
      />
    </div>
  </div>
</template>

<style scoped>

</style>

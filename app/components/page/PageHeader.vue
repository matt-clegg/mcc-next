<script setup lang="ts">
const { user, loggedIn, clear } = useUserSession();

const links = [
  {
    label: "About",
    children: [
      {
        label: "About Us",
        to: "/about-us"
      },
      {
        label: "What We Do",
        to: "/about-us"
      },
      {
        label: "Where We Are",
        to: "/about-us"
      },
      {
        label: "Club History",
        to: "/about-us"
      },
      {
        label: "Newsletters",
        to: "/about-us"
      },
      {
        label: "Governance",
        children: [
          {
            label: "Our Committee",
            to: "/about-us"
          },
          {
            label: "Meeting Minutes",
            to: "/about-us"
          },
          {
            label: "Club Documents",
            to: "/about-us"
          }
        ]
      }
    ]
  },
  {
    label: "Come & Paddle",
    children: [
      {
        label: "Paddle With Us",
        to: "/about-us"
      },
      {
        label: "Beginners Course Dates",
        to: "/about-us"
      },
      {
        label: "Coached Paddles & Courses",
        to: "/about-us"
      },
      {
        label: "Membership",
        to: "/about-us"
      }
    ]
  },
  {
    label: "Contact",
    children: [
      {
        label: "Contact Us",
        to: "/about-us"
      }
    ]
  },
  {
    label: "Calendar",
    to: "/calendar",
    icon: "i-heroicons-calendar-days"
  },
  {
    label: "News",
    to: "/news",
    icon: "i-heroicons-newspaper"
  }
];

const items = computed(() => ([
  [{
    label: user.value!.email,
    slot: "account",
    disabled: true
  }],
  [{
    label: "My profile",
    icon: "i-heroicons-user"
  }],
  [
    {
      label: "Coaching",
      icon: "i-heroicons-book-open"
    }, {
      label: "Admin",
      icon: "i-heroicons-cog-8-tooth",
      to: "/admin"
    }
    //   {
    //   label: "Changelog",
    //   icon: "i-heroicons-megaphone"
    // }, {
    //   label: "Status",
    //   icon: "i-heroicons-signal"
    // }
  ],
  [{
    label: "Sign out",
    icon: "i-heroicons-arrow-left-on-rectangle",
    click: async () => {
      await clear();
      await navigateTo("/");
    }
  }]
]));

const loginUrl = useLoginUrl();
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <NuxtImg
        src="/images/logo-no-text-blue.svg"
        class="w-auto h-8"
      />
    </template>

    <template #right>
      <UDropdown
        v-if="loggedIn"
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar
          src="https://avatars.githubusercontent.com/u/34515355?v=4"
          size="md"
        />

        <template #account="{ item }">
          <div class="text-left">
            <p>
              Signed in as
            </p>
            <p class="truncate font-medium text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
          </div>
        </template>

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>

          <UIcon
            :name="item.icon"
            class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
          />
        </template>
      </UDropdown>
      <UButton
        v-else
        :to="loginUrl"
      >
        Login
      </UButton>
    </template>

    <template #panel>
      <UNavigationTree
        :links="links"
        :default-open="false"
      />
    </template>
  </UHeader>
</template>

<style scoped>

</style>

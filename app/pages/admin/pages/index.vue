﻿<script setup lang="ts">
import type { NavigationTree } from "#ui-pro/types";

definePageMeta({
  layout: "admin",
  middleware: "admin"
});

const editSlideoverOpen = ref(false);
const newPageModalOpen = ref(false);

function onEdit() {
  console.log("on edit");
  editSlideoverOpen.value = true;
}

function onAddClick() {
  newPageModalOpen.value = true;
}

const pages: NavigationTree[] = [
  {
    label: "About",
    icon: "i-heroicons-folder",
    children: [
      {
        label: "About Us",
        icon: "i-heroicons-document-text",
        click: onEdit
      },
      {
        label: "What We Do",
        icon: "i-heroicons-document-text"
      },
      {
        label: "Where We Are",
        icon: "i-heroicons-document-text"
      },
      {
        label: "Club History",
        icon: "i-heroicons-document-text"
      },
      {
        label: "Newsletters",
        icon: "i-heroicons-document-text"
      },
      {
        label: "Governance",
        icon: "i-heroicons-folder",
        children: [
          {
            label: "Our Committee",
            icon: "i-heroicons-document-text"
          },
          {
            label: "Meeting Minutes",
            icon: "i-heroicons-document-text"
          },
          {
            label: "Club Documents",
            icon: "i-heroicons-document-text"
          },
          {
            label: "Add page or folder",
            icon: "i-heroicons-plus-small-20-solid"
          }
        ]
      },
      {
        label: "Add page or folder",
        icon: "i-heroicons-plus-small-20-solid",
        click: onAddClick
      }
    ]
  },
  {
    label: "Come & Paddle",
    icon: "i-heroicons-folder",
    children: [
      {
        label: "Paddle With Us",
        icon: "i-heroicons-document-text"
      },
      {
        label: "Beginners Course Dates",
        icon: "i-heroicons-document-text"
      },
      {
        label: "Coached Paddles & Courses",
        icon: "i-heroicons-document-text"
      },
      {
        label: "Membership",
        icon: "i-heroicons-document-text"
      },
      {
        label: "Add page or folder",
        icon: "i-heroicons-plus-small-20-solid",
        click: onAddClick
      }
    ]
  },
  {
    label: "Contact",
    icon: "i-heroicons-folder",
    children: [
      {
        label: "Contact Us",
        icon: "i-heroicons-document-text"
      },
      {
        label: "Add page or folder",
        icon: "i-heroicons-plus-small-20-solid",
        click: onAddClick
      }
    ]
  },
  {
    label: "Add page or folder",
    icon: "i-heroicons-plus-small-20-solid",
    click: onAddClick
  }
];
</script>

<template>
  <UDashboardPanelContent>
    <UNavigationTree :links="pages" />

    <LazyAdminPagesCreateModal v-model:open="newPageModalOpen" />
  </UDashboardPanelContent>
</template>

<style scoped>

</style>

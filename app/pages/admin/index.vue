<script setup lang="ts">
definePageMeta({
  layout: "admin"
});
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Home">
        <template #right>
          <UTooltip
            text="Notifications"
            :shortcuts="['N']"
          >
            <!--            <UButton -->
            <!--              color="gray" -->
            <!--              variant="ghost" -->
            <!--              square -->
            <!--              @click="isNotificationsSlideoverOpen = true" -->
            <!--            > -->
            <!--              <UChip -->
            <!--                color="red" -->
            <!--                inset -->
            <!--              > -->
            <!--                <UIcon -->
            <!--                  name="i-heroicons-bell" -->
            <!--                  class="w-5 h-5" -->
            <!--                /> -->
            <!--              </UChip> -->
            <!--            </UButton> -->
          </UTooltip>

          <!--          <UDropdown :items="items"> -->
          <!--            <UButton -->
          <!--              icon="i-heroicons-plus" -->
          <!--              size="md" -->
          <!--              class="ml-1.5 rounded-full" -->
          <!--            /> -->
          <!--          </UDropdown> -->
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent>
        Admin home page
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped>

</style>

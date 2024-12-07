<script setup lang="ts">
import { z } from "zod";

const route = useRoute();
const redirect = route.query.redirect as string | undefined | null;

const session = useUserSession();

const redirectUrl = computed(() => redirect ? decodeURIComponent(redirect) : "/");

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// type Schema = z.output<typeof schema>;

const fields = [
  {
    name: "email",
    type: "text",
    label: "Email",
    placeholder: "Enter your email"
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password"
  }
];

async function onSubmit(data: any) {
  console.log("data", data);

  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: data.email,
        password: data.password
      }
    });
    await session.fetch();
    await navigateTo(redirectUrl.value);
  }
  catch (err: any) {
    handleFetchError(err);
  }
}
</script>

<template>
  <UContainer class="mt-10 flex justify-center items-center">
    <UAuthForm
      title="Login"
      :fields="fields"
      :schema="schema"
      @submit="onSubmit"
    />
  </UContainer>
</template>

<style scoped>

</style>

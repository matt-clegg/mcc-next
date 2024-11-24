<script setup lang="ts">
import { z } from "zod";

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

  await $fetch("/api/auth/login", {
    method: "POST",
    body: {
      email: data.email,
      password: data.password
    }
  });
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

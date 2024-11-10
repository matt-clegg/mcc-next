// import { describe, expect, it } from "vitest";
// import { $fetch } from "@nuxt/test-utils/e2e";
//
// describe("user auth", async () => {
//   it("invalid user login", async () => {
//     await expect(() =>
//       $fetch("/api/auth/login", {
//         method: "POST",
//         body: {
//           email: "example@email.com",
//           password: "password"
//         }
//       })).rejects.toThrowError("Incorrect credentials");
//   });
//
//   it("valid registration", async () => {
//     const response = await $fetch("/api/auth/register", {
//       method: "POST",
//       body: {
//         email: "admin@example.com",
//         password: "password"
//       }
//     });
//
//     expect(response).toHaveProperty("email", "foob@email.com");
//   });
//
//   it("can login after registration", async () => {
//     const response = await $fetch("/api/auth/login", {
//       method: "POST",
//       body: {
//         email: "admin@example.com",
//         password: "password"
//       }
//     });
//
//     expect(response).toHaveProperty("email", "foob@email.com");
//   });
//
//   it("cannot register with existing email", async () => {
//     await expect(() =>
//       $fetch("/api/auth/register", {
//         method: "POST",
//         body: {
//           email: "admin@example.com",
//           password: "password"
//         }
//       })).rejects.toThrowError("User already exists");
//   });
// });

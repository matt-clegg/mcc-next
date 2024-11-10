import { describe, expect, it } from "vitest";
import { fetch } from "@nuxt/test-utils/e2e";

describe("roles", async () => {
  it("can create a role", async () => {
    const { body, status, headers } = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "admin@example.com",
        password: "password"
      })
    });

    expect(body).toBe("");
    expect(status).toBe(200);
    expect(headers).toEqual({});

    const response = await $fetch("/api/roles", {
      method: "POST",
      body: {
        name: "Editor"
      }
    });

    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("name", "Editor");
  });
});

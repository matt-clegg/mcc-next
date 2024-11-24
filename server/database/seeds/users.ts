import { faker } from "@faker-js/faker";
import * as schema from "../schema";
import type { Database } from "~~/server/utils/drizzle";
import type { UserInsert } from "~~/server/database/schema/users";

export default async function seed(db: Database) {
  const user: UserInsert = {
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "Person",
    dateOfBirth: new Date().toISOString(),
    lastAccess: new Date().toISOString(),
    isAdmin: true,
    isJunior: false,
    parent: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const { id } = await db
    .insert(schema.users)
    .values(user)
    .returning({ id: schema.users.id })
    .get();

  const passwordHash = "$scrypt$n=16384,r=8,p=1$82NjnzXW4BuHQlkGT52BWA$JlW5UeS2TPkFkPj0Xp/RHPNvCLUkuOGrwhr+uFPlOKH6eE8+uRXCT/QM2XcBo/tFI1ms84dsgvNLuSx7RBm5og";

  await db.insert(schema.credentials).values({
    user: id,
    passwordHash
  });

  const users = [];
  const batchSize = 50;
  const userIds = [];

  for (let i = 0; i < 4000; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    users.push({
      email,
      firstName,
      lastName,
      dateOfBirth: faker.date.between({ from: "1950-01-01", to: "2015-01-01" }).toISOString(),
      lastAccess: faker.date.recent({ days: 365 }).toISOString(),
      isAdmin: false,
      isJunior: Math.random() < 0.2,
      isVerified: Math.random() < 0.05,
      parent: null,
      createdAt: faker.date.past().toISOString()
    });

    if (users.length === batchSize || i === 3999) {
      const ids = await db
        .insert(schema.users)
        .values(users)
        .returning({ id: schema.users.id });
      userIds.push(...ids);
      users.length = 0; // Clear the users array for next batch
    }
  }

  const credentials = [];

  for (const id of userIds) {
    credentials.push({
      user: id.id,
      passwordHash: "$scrypt$n=16384,r=8,p=1$82NjnzXW4BuHQlkGT52BWA$JlW5UeS2TPkFkPj0Xp/RHPNvCLUkuOGrwhr+uFPlOKH6eE8+uRXCT/QM2XcBo/tFI1ms84dsgvNLuSx7RBm5og"
    });
  }

  await db.insert(schema.credentials)
    .values(credentials);
}

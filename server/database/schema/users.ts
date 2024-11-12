import type { AnySQLiteColumn } from "drizzle-orm/sqlite-core";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import memberships from "./memberships";
import familyMembers from "./family-members";
import { userRoles } from "./roles";
import { credentials } from "./credentials";
import folderPermissions from "./folder-permissions";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  lastAccess: text("last_login").notNull().$defaultFn(() => sql`datetime(current_timestamp)`),
  isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
  isJunior: integer("is_junior", { mode: "boolean" }).notNull().default(false),
  parent: text("parent_id").references((): AnySQLiteColumn => users.id, { onDelete: "set null" }),
  createdAt: text("created_at").notNull().$defaultFn(() => sql`datetime(current_timestamp)`),
  updatedAt: text("updated_at").notNull().$defaultFn(() => sql`datetime(current_timestamp)`).$onUpdateFn(() => sql`datetime(current_timestamp)`)
});

export const usersRelations = relations(users, ({ one, many }) => ({
  parent: one(users, {
    fields: [users.parent],
    references: [users.id]
  }),
  roles: many(userRoles),
  memberships: one(memberships),
  familyMemberOwners: many(familyMembers, {
    relationName: "familyMembersOwned"
  }),
  familyMembersOfUser: many(familyMembers, {
    relationName: "familyMembersOfUser"
  }),
  credentials: one(credentials),
  folderPermissions: many(folderPermissions)
}));

export type UserInsert = typeof users.$inferInsert;

export default users;

import type { AnySQLiteColumn } from "drizzle-orm/sqlite-core";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { useHash } from "../../../shared/utils/hash";
import { timestampColumns } from "../../utils/database";
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
  isVerified: integer("is_verified", { mode: "boolean" }).notNull().default(false),
  parent: text("parent_id").references((): AnySQLiteColumn => users.id, { onDelete: "set null" }),
  ...timestampColumns
}, users => ({
  firstNameIdx: index("ix_users_first_name").on(users.firstName),
  lastNameIdx: index("ix_users_last_name").on(users.lastName)
}));

export const passwordResetTokens = sqliteTable("password_reset_tokens", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  user: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: text("expires_at").notNull()
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
  folderPermissions: many(folderPermissions),
  passwordRestTokens: one(passwordResetTokens)
}));

export const passwordRestTokensRelations = relations(passwordResetTokens, ({ one }) => ({
  user: one(users, {
    fields: [passwordResetTokens.user],
    references: [users.id]
  })
}));

export type UserInsert = typeof users.$inferInsert;
export type UserSelect = typeof users.$inferSelect;

export default users;

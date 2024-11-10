import { sqliteTable, text, primaryKey, index } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import users from "./users";

export const familyMembers = sqliteTable("family_members", {
  owner: text("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  user: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" })
}, familyMembers => ({
  uniqueFamily: primaryKey({ columns: [familyMembers.owner, familyMembers.user] }),
  ownerIdx: index("ix_family_members_owner").on(familyMembers.owner),
  userIdx: index("ix_family_members_user").on(familyMembers.user)
}));

export const familyMemberRelations = relations(familyMembers, ({ one }) => ({
  owner: one(users, {
    fields: [familyMembers.owner],
    references: [users.id],
    relationName: "familyMembersOwned"
  }),
  user: one(users, {
    fields: [familyMembers.user],
    references: [users.id],
    relationName: "familyMembersOfUser"
  })
}));

export type FamilyMemberInsert = typeof familyMembers.$inferInsert;

export default familyMembers;

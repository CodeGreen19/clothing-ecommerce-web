// drizzle/schema/cartItems.ts
import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelper";
import { users } from "./users";

export const shippingInfo = pgTable("shipping_info", {
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  phoneNo: text("phone_no").notNull(),
  district: text("district").notNull(),
  area: text("area").notNull(),
  address: text("address").notNull(),
  email: text("email"),
  note: text("note"),
  createdAt,
  updatedAt,
});

export const shippingInfoRelations = relations(shippingInfo, ({ one }) => ({
  user: one(users, { fields: [shippingInfo.userId], references: [users.id] }),
}));

// drizzle/schema/cartItems.ts
import { relations } from "drizzle-orm";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { products, SizesEnum } from "./products";
import { users } from "./users";

export const cartItems = pgTable("cart_items", {
  id,
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  productName: text("product_name").notNull(),
  color: text("color").notNull(),
  size: SizesEnum("size").notNull(),
  quantity: integer("quantity").notNull().default(1),
  price: integer("price").notNull().default(400),
  createdAt,
  updatedAt,
});

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(users, { fields: [cartItems.userId], references: [users.id] }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

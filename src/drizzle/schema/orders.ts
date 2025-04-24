// drizzle/schema/cartItems.ts
import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { SizesEnum } from "./products";
import { users } from "./users";
import { ORDER_STATUS } from "@/constants/dashboard";

export const orderStatusEnum = pgEnum("order_status", ORDER_STATUS);
export const orders = pgTable("orders", {
  id,
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull().default("adam"),
  phoneNo: text("phone_no").notNull().default("01870425052"),
  transId: text("trans_id").notNull().default("adkskiek45dr3d3"),
  orderStatus: orderStatusEnum().notNull().default("pending"),
  totalAmount: integer("total_amount").notNull(),
  deliveryPlace: text("delivery_place").notNull(),
  deliveryMethod: text("delivery_method").notNull(),
  shippingCharge: integer("shipping_charge"),
  createdAt,
  updatedAt,
});

// order relations..................
export const orderRelations = relations(orders, ({ many, one }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  orderItems: many(orderItems),
}));
// order relations..................end

export const orderItems = pgTable("order_items", {
  id,
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productName: text("product_name").notNull(),
  color: text("color").notNull(),
  size: SizesEnum("size").notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  createdAt,
  updatedAt,
});

// order Items relations
export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
}));

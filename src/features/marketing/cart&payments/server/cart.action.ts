"use server";
import { db } from "@/drizzle/db";
import { cartItems } from "@/drizzle/schema";
import { eq, and, count } from "drizzle-orm";
import { CreateCartItemProps } from "../types";
import { handleServerError } from "@/features/dashboard/error";
import { getUserIdFromAuthSession } from "@/features/auth/server/auth.helper";

export const createCartItem = async (data: CreateCartItemProps) => {
  try {
    const { productId, productName, color, size, quantity } = data;

    const userId = await getUserIdFromAuthSession();
    if (!userId) {
      return { error: "Please Login" };
    }

    const existing = await db.query.cartItems.findFirst({
      where: and(
        eq(cartItems.userId, userId),
        eq(cartItems.productId, productId),
        eq(cartItems.color, color),
        eq(cartItems.size, size),
      ),
    });

    if (existing) {
      await db
        .update(cartItems)
        .set({ quantity: existing.quantity + quantity })
        .where(eq(cartItems.id, existing.id));
    } else {
      await db.insert(cartItems).values({
        userId,
        productId,
        productName,
        color,
        size,
        quantity,
      });
    }
    return { message: "Product Added to Cart" };
  } catch (error) {
    return handleServerError(error);
  }
};

//
export const getUserCarts = async () => {
  const userId = await getUserIdFromAuthSession();
  if (!userId) {
    return null;
  }

  const cartItem = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.userId, userId));
  return cartItem;
};
export const getUserCartCount = async () => {
  const userId = await getUserIdFromAuthSession();
  if (!userId) {
    return 0;
  }

  const [cartCount] = await db
    .select({ count: count() })
    .from(cartItems)
    .where(eq(cartItems.userId, userId));
  return cartCount.count;
};

// delete cart
export const deleteItemFromCart = async (id: string) => {
  try {
    await db.delete(cartItems).where(eq(cartItems.id, id));
    return { message: "Cart Item Removed" };
  } catch (error) {
    return handleServerError(error);
  }
};

"use server";

import { db } from "@/drizzle/db";
import { cartItems, orderItems, orders, shippingInfo } from "@/drizzle/schema";
import { getUserIdFromAuthSession } from "@/features/auth/server/auth.helper";
import { handleServerError } from "@/features/dashboard/error";
import { eq } from "drizzle-orm";
import { CheckoutInfoType, DBShippingInfo } from "../types";
import { generateTransactionId } from "../helper";

export const getCheckoutInfo = async () => {
  const userId = await getUserIdFromAuthSession();
  if (!userId) {
    return { message: "Userid is not valid" };
  }

  const info = await db
    .select({ price: cartItems.price })
    .from(cartItems)
    .where(eq(cartItems.userId, userId));

  const totalAmount = info.reduce((prev, curr): number => {
    return prev + curr.price;
  }, 0);
  return { totalAmount };
};

export const placeOrder = async (info: CheckoutInfoType) => {
  try {
    const userId = await getUserIdFromAuthSession();
    if (!userId) return { message: "Userid is not valid" };

    //getting or inserting shipping info
    let shippingInfoArr: DBShippingInfo[] = [];
    const getShippingInfo = await db
      .select()
      .from(shippingInfo)
      .where(eq(shippingInfo.userId, userId));

    const newObj = { ...info, userId };
    if (!getShippingInfo.length) {
      const newShippingInfo = await db
        .insert(shippingInfo)
        .values(newObj)
        .returning();
      shippingInfoArr = newShippingInfo;
    } else {
      shippingInfoArr = getShippingInfo;
    }
    const genTransId = generateTransactionId(15);
    // create order
    const [newOrder] = await db
      .insert(orders)
      .values({
        userId,
        name: info.name,
        phoneNo: info.phoneNo,
        transId: genTransId,
        deliveryMethod: info.method,
        deliveryPlace: info.delevery,
        totalAmount: info.totalAmount,
      })
      .returning();

    // getting cart info

    // todo: delete console log
    console.log(shippingInfoArr);

    const cartInfos = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.userId, userId));

    // updating and deleting cartinfo order items

    // 4. Create Order Items + Delete Cart Items
    const orderItemValues = cartInfos.map((item) => ({
      orderId: newOrder.id,
      color: item.color,
      price: item.price,
      productName: item.productName,
      quantity: item.quantity,
      size: item.size,
    }));

    await db.insert(orderItems).values(orderItemValues);
    await db.delete(cartItems).where(eq(cartItems.userId, userId));
    // success
    return { message: "Orders Placed Successfully" };
  } catch (error) {
    return handleServerError(error);
  }
};

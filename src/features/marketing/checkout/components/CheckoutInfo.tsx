import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { env } from "@/data/env/client";
import { Dispatch, SetStateAction } from "react";
import { CHECKOUT_METHOD_ARR } from "../constants";
import { CheckoutMethodType } from "../types";

const CheckoutUI = ({
  amount,
  isPending,
  payment,
  setPayment,
  setShipping,
  shipping,
  submitPending,
}: {
  amount: number | undefined;
  isPending: boolean;
  submitPending: boolean;
  shipping: "inside" | "outside";
  setShipping: Dispatch<SetStateAction<"inside" | "outside">>;
  payment: CheckoutMethodType;
  setPayment: Dispatch<SetStateAction<CheckoutMethodType>>;
}) => {
  const insideDhakaAmount = Number(
    env.NEXT_PUBLIC_INSIDE_DHAKA_DELEVERY_AMOUNT,
  );
  const outsideDhakaAmount = Number(
    env.NEXT_PUBLIC_OUTSIDE_DHAKA_DELEVERY_AMOUNT,
  );

  const shippingCost =
    shipping === "outside" ? outsideDhakaAmount : insideDhakaAmount;
  const totalMRP = amount;
  const totalAmount = (totalMRP ?? 0) + shippingCost;

  return (
    <div className="mx-auto max-w-md p-6">
      <Card className="space-y-6 p-4">
        <div className="font-medium text-pink-500">Have Coupon / Voucher?</div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">Choose Shipping Method</h2>
          <RadioGroup
            value={shipping}
            onValueChange={(e) => setShipping(e as "inside" | "outside")}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="outside" id="outside" />
              <Label htmlFor="outside" className="flex w-full justify-between">
                <span>Delivery Outside Dhaka</span>
                <span>৳ {outsideDhakaAmount}</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inside" id="inside" />
              <Label htmlFor="inside" className="flex w-full justify-between">
                <span>Delivery Inside Dhaka</span>
                <span>৳ {insideDhakaAmount}</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="text-right font-medium">
          Total MRP: ৳ {!isPending && <span>{totalMRP}.00</span>}
        </div>

        <hr />

        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Total Amount</span>
          {isPending ? (
            <span className="text-pink-500">৳ ___.00</span>
          ) : (
            <span className="text-pink-500">৳ {totalAmount}.00</span>
          )}
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">Choose Payment Method</h2>
          <RadioGroup
            value={payment}
            onValueChange={(e) => setPayment(e as CheckoutMethodType)}
            className="space-y-2"
          >
            {CHECKOUT_METHOD_ARR.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <RadioGroupItem value={item} id="card" />
                <Label htmlFor="card">{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button
          disabled={submitPending}
          type="submit"
          className="w-full bg-pink-500 py-6 text-lg font-semibold text-white hover:bg-pink-600"
        >
          Place Order
        </Button>
      </Card>
    </div>
  );
};

export default CheckoutUI;

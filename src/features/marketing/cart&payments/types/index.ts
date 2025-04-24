import { AllPossibleSizesType } from "@/constants/dashboard/types";

export type CreateCartItemProps = {
  productId: string;
  productName: string;
  color: string;
  size: AllPossibleSizesType;
  quantity: number;
};

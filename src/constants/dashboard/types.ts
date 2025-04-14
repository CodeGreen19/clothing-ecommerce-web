// products

import {
  ALL_PRODUCTS_SIZES,
  CLOTH_BRANDS,
  DELEVERY_OPTIONS,
  GENDERS,
  GENERIC_PRODUCT_CATEGORIES,
  PRODUCT_QUALIFICATIONS,
  RETURN_OPTIONS,
  WARRANTY_OPTIONS,
} from ".";

export type BreadCrumbType = {
  pathname: string;
  breadcrumb: { name: string; link: string }[];
};

export type ProductCategoryAndSubCategoryListType = {
  category: string;
  subcategories: string[];
  materials: string[];
};

export type AllPossibleSizesType = (typeof ALL_PRODUCTS_SIZES)[number];
export type AllGendersType = (typeof GENDERS)[number];
export type WarrantyOptionsType = (typeof WARRANTY_OPTIONS)[number];
export type DeliveryOptionsType = (typeof DELEVERY_OPTIONS)[number];
export type ReturnOptionsType = (typeof RETURN_OPTIONS)[number];
export type ProductQualificationsType = (typeof PRODUCT_QUALIFICATIONS)[number];
export type GenericProductCategoriesType =
  (typeof GENERIC_PRODUCT_CATEGORIES)[number];
export type ClothBrandsType = (typeof CLOTH_BRANDS)[number];

export type UploadImgType = {
  secure_url: string;
  public_id: string;
};

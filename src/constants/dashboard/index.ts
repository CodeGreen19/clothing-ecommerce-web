// products

import { BreadCrumbType, ProductCategoryAndSubCategoryListType } from "./types";

export const DASHBOARD_BREAD_CRUMB: BreadCrumbType[] = [
  {
    pathname: "/dashboard",
    breadcrumb: [{ name: "Dashboard", link: "/dashboard" }],
  },
  {
    pathname: "/dashboard/analytics",
    breadcrumb: [
      { name: "Dashboard", link: "/dashboard" },
      { name: "Analytics", link: "/dashboard/analytics" },
    ],
  },
  {
    pathname: "/dashboard/users",
    breadcrumb: [
      { name: "Dashboard", link: "/dashboard" },
      { name: "Users", link: "/dashboard/users" },
    ],
  },
  {
    pathname: "/dashboard/products",
    breadcrumb: [
      { name: "Dashboard", link: "/dashboard" },
      { name: "Products", link: "/dashboard/products" },
    ],
  },
  {
    pathname: "/dashboard/products/create-new",
    breadcrumb: [
      { name: "Dashboard", link: "/dashboard" },
      { name: "Products", link: "/dashboard/products" },
      { name: "Create", link: "/dashboard/products/create-new" },
    ],
  },

  {
    pathname: "/dashboard/orders",
    breadcrumb: [
      { name: "Dashboard", link: "/dashboard" },
      { name: "Orders", link: "/dashboard/orders" },
    ],
  },
  {
    pathname: "/dashboard/settings",
    breadcrumb: [
      { name: "Dashboard", link: "/dashboard" },
      { name: "Settings", link: "/dashboard/settings" },
    ],
  },
] as const;

export const ALL_PRODUCTS_CATEGORY_WITH_SUBCATEGORY: ProductCategoryAndSubCategoryListType[] =
  [
    {
      category: "Clothing",
      subcategories: [
        "T-shirts",
        "Shirts",
        "Blouses",
        "Sweaters",
        "Cardigans",
        "Hoodies",
        "Jackets",
        "Vests",
        "Coats",
        "Suits",
        "Dresses",
        "Skirts",
        "Pants",
        "Jeans",
        "Shorts",
        "Leggings",
        "Overalls",
        "Rompers",
        "Jumpsuits",
        "Tops",
      ],
      materials: [
        "Cotton",
        "Polyester",
        "Wool",
        "Linen",
        "Silk",
        "Rayon",
        "Nylon",
        "Denim",
        "Spandex",
        "Viscose",
        "Velvet",
        "Flannel",
        "Hemp",
      ],
    },
    {
      category: "Outerwear",
      subcategories: [
        "Coats",
        "Jackets",
        "Blazers",
        "Raincoats",
        "Parkas",
        "Trench Coats",
        "Peacoats",
        "Windbreakers",
        "Bomber Jackets",
      ],
      materials: [
        "Wool",
        "Cashmere",
        "Polyester",
        "Leather",
        "Faux Leather",
        "Cotton",
        "Denim",
        "Fleece",
        "Nylon",
        "Gore-Tex",
        "Synthetic Blends",
      ],
    },
    {
      category: "Fashion",
      subcategories: [
        "Streetwear",
        "Luxury Fashion",
        "Vintage Fashion",
        "Plus Size Fashion",
        "Sustainable Fashion",
        "Ethical Fashion",
        "Casual Wear",
        "Formal Wear",
        "Evening Wear",
      ],
      materials: [
        "Organic Cotton",
        "Linen",
        "Silk",
        "Wool",
        "Satin",
        "Bamboo Fabric",
        "Hemp",
        "Cashmere",
        "Recycled Fabrics",
        "Tencel",
        "Rayon",
      ],
    },
    {
      category: "Activewear",
      subcategories: [
        "Leggings",
        "Sports Bras",
        "T-shirts",
        "Tank Tops",
        "Sweatpants",
        "Jackets",
        "Athletic Shorts",
        "Sports Shoes",
        "Yoga Pants",
      ],
      materials: [
        "Polyester",
        "Spandex",
        "Nylon",
        "Bamboo Fabric",
        "Moisture-Wicking Fabrics",
        "Recycled Polyester",
        "Elastane",
        "Merino Wool",
      ],
    },
    {
      category: "Sportswear",
      subcategories: [
        "T-shirts",
        "Jerseys",
        "Shorts",
        "Sweatshirts",
        "Tracksuits",
        "Compression Wear",
        "Sports Shoes",
        "Running Shoes",
        "Hoodies",
      ],
      materials: [
        "Polyester",
        "Nylon",
        "Spandex",
        "Cotton Blends",
        "Mesh",
        "Gore-Tex",
        "Moisture-Wicking Fabrics",
        "Synthetic Blends",
      ],
    },
    {
      category: "Underwear",
      subcategories: [
        "Bras",
        "Panties",
        "Briefs",
        "Thongs",
        "Bikinis",
        "Boyshorts",
        "Bodysuits",
        "Shapewear",
        "Maternity Underwear",
        "Lingerie",
        "Sleepwear",
      ],
      materials: [
        "Cotton",
        "Silk",
        "Lace",
        "Modal",
        "Bamboo Fabric",
        "Spandex",
        "Nylon",
        "Microfiber",
        "Polyester Blends",
        "Mesh",
      ],
    },
  ] as const;

export const ALL_PRODUCTS_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export const GENDERS = ["Male", "Female", "Unisex"] as const;
export const WARRANTY_OPTIONS = ["Available", "Not available"] as const;
export const DELEVERY_OPTIONS = ["Available", "Not available"] as const;
export const RETURN_OPTIONS = ["7 days", "14 days"] as const;
export const PRODUCT_QUALIFICATIONS = [
  "New Arrived",
  "Best Seller",
  "Premium",
  "Limited Edition",
  "Trending",
  "Exclusive",
  "Hot Deal",
  "Customer Favorite",
  "Editor's Pick",
  "Top Rated",
  "Luxury",
  "Eco-Friendly",
  "Handmade",
  "Budget-Friendly",
  "Seasonal",
  "Limited Stock",
  "Imported",
  "Organic",
  "High Demand",
  "Fast Selling",
] as const;
export const GENERIC_PRODUCT_CATEGORIES = [
  "Clothing",
  "Outerwear",
  "Fashion",
  "Activewear",
  "Undergerment",
] as const;

export const CLOTH_BRANDS = [
  "Aarong",
  "Kay Kraft",
  "Anjan's",
  "Sadakalo",
  "Rang",
  "Yellow",
  "Ecstasy",
  "Le Reve",
  "Sailor",
  "Richman",
  "Deshal",
] as const;

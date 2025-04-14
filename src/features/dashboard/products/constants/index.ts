import { AiFillProduct } from "react-icons/ai";
import { BiSolidAnalyse } from "react-icons/bi";
import { CiBullhorn, CiSettings } from "react-icons/ci";
import { FaUsers } from "react-icons/fa6";

import { MdDashboard } from "react-icons/md";
import { AppSideBarOptionsType } from "../types";

// Menu items.
export const APP_SIZEBAR_OPTIONS: AppSideBarOptionsType[] = [
  {
    sectionName: "Managements",
    options: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: MdDashboard,
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: BiSolidAnalyse,
      },
      {
        title: "Users",
        url: "/dashboard/users",
        icon: FaUsers,
      },
      {
        title: "Products",
        url: "/dashboard/products",
        icon: AiFillProduct,
      },
      {
        title: "Orders",
        url: "/dashboard/orders",
        icon: CiBullhorn,
      },
    ],
  },
  {
    sectionName: "Tranjunctions",
    options: [
      {
        title: "Invoices",
        url: "/dashboard/invoice",
        icon: FaUsers,
      },
      {
        title: "Discounts",
        url: "/dashboard/discount",
        icon: CiBullhorn,
      },
      {
        title: "Coupon",
        url: "/dashboard/coupon",
        icon: CiSettings,
      },
    ],
  },
  {
    sectionName: "Actions",
    options: [
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: CiSettings,
      },
    ],
  },
];

export const ALL_POSSIBLE_COLORS = [
  { name: "Red", tailwind: "bg-red-500 text-white" },
  { name: "Orange", tailwind: "bg-orange-500 text-white" },
  { name: "Yellow", tailwind: "bg-yellow-500 text-black" },
  { name: "Green", tailwind: "bg-green-500 text-white" },
  { name: "Blue", tailwind: "bg-blue-500 text-white" },
  { name: "Indigo", tailwind: "bg-indigo-500 text-white" },
  { name: "Violet", tailwind: "bg-violet-500 text-white" },
  { name: "Purple", tailwind: "bg-purple-500 text-white" },
  { name: "Pink", tailwind: "bg-pink-500 text-white" },
  { name: "Brown", tailwind: "bg-amber-900 text-white" },
  { name: "White", tailwind: "bg-white text-black" },
  { name: "Black", tailwind: "bg-black text-white" },
  { name: "Gray", tailwind: "bg-gray-500 text-white" },
  { name: "Silver", tailwind: "bg-slate-300 text-black" },
  { name: "Gold", tailwind: "bg-yellow-400 text-black" },
  { name: "Beige", tailwind: "bg-amber-100 text-black" },
  { name: "Cream", tailwind: "bg-yellow-100 text-black" },
  { name: "Teal", tailwind: "bg-teal-500 text-white" },
  { name: "Navy", tailwind: "bg-blue-900 text-white" },
  { name: "Maroon", tailwind: "bg-red-800 text-white" },
  { name: "Olive", tailwind: "bg-lime-800 text-white" },
  { name: "Magenta", tailwind: "bg-fuchsia-500 text-white" },
  { name: "Cyan", tailwind: "bg-cyan-500 text-white" },
  { name: "Lime", tailwind: "bg-lime-500 text-black" },
  { name: "Turquoise", tailwind: "bg-sky-400 text-black" },
  { name: "Peach", tailwind: "bg-orange-200 text-black" },
  { name: "Coral", tailwind: "bg-rose-400 text-white" },
  { name: "Lavender", tailwind: "bg-violet-200 text-black" },
  { name: "Mustard", tailwind: "bg-yellow-600 text-white" },
  { name: "Burgundy", tailwind: "bg-red-700 text-white" },
  { name: "Khaki", tailwind: "bg-yellow-300 text-black" },
  { name: "Magenta", tailwind: "bg-pink-700 text-white" },
  { name: "Peach", tailwind: "bg-orange-300 text-black" },
  { name: "Aqua", tailwind: "bg-teal-200 text-black" },
  { name: "LavenderBlush", tailwind: "bg-pink-100 text-black" },
  { name: "Charcoal", tailwind: "bg-gray-900 text-white" },
] as const;

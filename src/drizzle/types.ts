import { InferSelectModel } from "drizzle-orm";
import { users } from "./schema";
import { ROLES_ARR } from "@/constants/auth";

export type UserTableType = InferSelectModel<typeof users>;

export type RolesEnum = (typeof ROLES_ARR)[number];

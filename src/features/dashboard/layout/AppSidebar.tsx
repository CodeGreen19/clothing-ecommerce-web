"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { APP_SIZEBAR_OPTIONS } from "../products/constants";

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold text-pink-600">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {APP_SIZEBAR_OPTIONS.map((item) => {
                return (
                  <div key={item.sectionName}>
                    <h4 className="mb-1 mt-4 border-b px-3 pb-1 text-xs font-semibold text-pink-500">
                      {item.sectionName}
                    </h4>
                    {item.options.map((info) => {
                      const isExectMatch = pathname.split("?")[0] === info.url;
                      const isSubPathMatch =
                        pathname.startsWith(info.url) &&
                        info.url !== "/dashboard";
                      const isSelected = isExectMatch || isSubPathMatch;
                      return (
                        <SidebarMenuItem
                          className={cn(
                            "group/lists",
                            isSelected && "selected rounded-md bg-pink-200",
                          )}
                          key={info.title}
                        >
                          <SidebarMenuButton className="py-5" asChild>
                            <Link
                              href={info.url}
                              className="hover:bg-pink-100/50 group-[.selected]/lists:hover:bg-pink-200"
                            >
                              <info.icon className="group-hover/lists:text-pink-500 group-[.selected]/lists:text-pink-500" />
                              <span>{info.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

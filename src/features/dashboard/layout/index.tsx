import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChildrenProps } from "@/data/types";
import React, { Suspense } from "react";
import { AppSidebar } from "./AppSidebar";
import UserProfile from "./UserProfile";
import { HeadingAndActions } from "./HeadingAndActions";
import { Toaster } from "sonner";

const DashboardLayout = ({ children }: ChildrenProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex w-full items-center justify-between px-1 py-2">
          <SidebarTrigger />
          <UserProfile />
        </div>
        <HeadingAndActions />
        <div className="w-full md:p-3">
          <Suspense fallback={<p>loading...</p>}>{children}</Suspense>
          <Toaster />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;

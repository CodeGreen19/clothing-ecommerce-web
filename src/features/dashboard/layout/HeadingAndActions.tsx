"use client";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { DASHBOARD_BREAD_CRUMB } from "@/constants/dashboard";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeadingAndActions = () => {
  const pathname = usePathname();

  return (
    <div className="w-full px-3">
      <Breadcrumb>
        <BreadcrumbList>
          {DASHBOARD_BREAD_CRUMB.map((mainItem) => {
            if (mainItem.pathname === pathname) {
              return mainItem.breadcrumb.map((item, index) => (
                <Fragment key={index}>
                  <BreadcrumbItem className="hover:text-black">
                    <Link href={item.link}>{item.name}</Link>
                  </BreadcrumbItem>
                  {index < mainItem.breadcrumb.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </Fragment>
              ));
            }
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export const HeadingAndActionsManual = ({
  info,
}: {
  info: { path: string; url: string }[];
}) => {
  return (
    <div className="w-full -translate-x-3 -translate-y-3 px-3">
      <Breadcrumb>
        <BreadcrumbList>
          {info.map((mainItem, index) => (
            <Fragment key={mainItem.path}>
              <BreadcrumbItem className="hover:text-black">
                <Link href={mainItem.url}>{mainItem.path}</Link>
              </BreadcrumbItem>
              {index < info.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default HeadingAndActions;

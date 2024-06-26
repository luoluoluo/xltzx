"use client";

// import type { MainNavItem } from "@/types";
import Link from "next/link";
import * as React from "react";

import { Icons } from "@/components/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { MainNavItem } from "@/types";

interface MobileNavProps {
  items?: MainNavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="flex justify-start size-5 lg:hidden cursor-pointer">
          <Icons.menu className="mr-2 w-5 h-5" aria-hidden="true" />
          <span className="sr-only">Toggle Menu</span>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="pt-9" onOpenAutoFocus={e => e.preventDefault()}>
        {items?.map((v, k) => {
          const openKey: string = `${k}`;
          const openKeyIndex = openKeys.findIndex(ok => ok === openKey);
          return (
            <div className="-ml-2" key={k}>
              <div key={k} className="w-full flex justify-between py-4">
                <Link
                  href={v.href || "/"}
                  className=" block px-2"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {v.title}
                </Link>
                {v.items ? (
                  <Icons.arrow
                    className={`w-[12px] text-gray-600 ${openKeyIndex === -1 ? "-rotate-90" : " rotate-180"}`}
                    onClick={() => {
                      if (openKeyIndex === -1) {
                        setOpenKeys([...openKeys, `${k}`]);
                      } else {
                        const newOpenKeys = openKeys.filter(ok => ok !== openKey);
                        setOpenKeys(newOpenKeys);
                      }
                    }}
                  />
                ) : null}
              </div>
              {openKeyIndex === -1 ? (
                <></>
              ) : (
                <div className="ml-4">
                  {v.items?.map((vv, kk) => (
                    <Link
                      href={vv.href || "/"}
                      key={kk}
                      className="p-2 block text-muted-foreground transition-colors active:text-foreground"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      {vv.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </SheetContent>
    </Sheet>
  );
}

"use client";
import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/contexts/auth";
import { cn } from "@/utils";
import { tokenKey } from "@/utils/auth";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthLink } from "./auth-link";

export function AuthDropdown({ className }: { className?: string }) {
  // const initials = `${user?.firstName?.charAt(0) ?? ""} ${user?.lastName?.charAt(0) ?? ""}`;
  const authContext = useContext(AuthContext);
  const me = authContext?.state?.me;
  return (
    <>
      {me ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className={cn(className)}>
              <Icons.person className=" w-5 h-5" />
              <span className="sr-only">登录</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <p className="font-medium leading-none overflow-hidden text-ellipsis whitespace-nowrap">你好，{me.name || me.id}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/order">
                  <DashboardIcon className="mr-2 w-4" aria-hidden="true" />
                  订单
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/setting">
                  <GearIcon className="mr-2 size-4" aria-hidden="true" />
                  设置
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="#"
                onClick={() => {
                  Cookies.remove(tokenKey);
                  window.location.reload();
                }}
              >
                <ExitIcon className="mr-2 size-4" aria-hidden="true" />
                退出
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <AuthLink>
          <Icons.person className=" w-5 h-5" />
        </AuthLink>
      )}
    </>
  );
}

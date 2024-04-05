"use client";

import React from "react";
import { Button } from "./button";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import Link from "next/link";
import { cn } from "@/lib/utils";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav className="flex justify-between items-center px-4 bg-white border-b h-12">
      <Link href="/" className="text-primary">
        MUJIBUR
      </Link>
      <div className="flex items-center gap-5">
        <div className="flex gap-3">
          <Link
            href="/staff"
            className={cn("text-blue-500", {
              "font-bold": pathname === "/staff",
            })}
          >
            Staff
          </Link>
          <Link
            href="/divisi"
            className={cn("text-blue-500", {
              "font-bold": pathname === "/divisi",
            })}
          >
            Divisi
          </Link>
        </div>
        <Button
          onClick={async () => {
            await logout();
            router.replace("/auth");
          }}
          variant="destructive"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;

"use client";

import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

function Navbar() {
  const router = useRouter();
  return (
    <nav className="flex justify-between items-center px-4 bg-white border-b h-12">
      <span className="text-primary">MUJIBUR</span>
      <Button
        onClick={async () => {
          await logout();
          router.replace("/auth");
        }}
        variant="destructive"
      >
        Logout
      </Button>
    </nav>
  );
}

export default Navbar;

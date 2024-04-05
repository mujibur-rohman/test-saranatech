import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function HomePage() {
  return (
    <div className="pt-20 flex justify-center items-center">
      <div className="flex gap-3">
        <Button asChild variant="outline">
          <Link href="/divisi">Go To Division</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/staff">Go To Staff</Link>
        </Button>
      </div>
    </div>
  );
}

export default HomePage;

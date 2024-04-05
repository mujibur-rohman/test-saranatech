import React from "react";
import { Button } from "./button";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import PaginationInterface from "@/types/pagination.types";

function ErrorRender({ refetch }: { refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>> }) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <p>Terjadi kesalahan</p>
        <Button size="sm" onClick={() => refetch()}>
          Refresh
        </Button>
      </div>
    </div>
  );
}

export default ErrorRender;

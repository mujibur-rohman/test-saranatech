import { Button } from "@/components/ui/button";
import { DivisionType } from "@/lib/division";
import { cn } from "@/lib/utils";
import DivisionService from "@/services/division.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function DetailDivision({ idDivision }: { idDivision: number }) {
  const {
    data: division,
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: [`division-detail`, idDivision],
    queryFn: async () => {
      return await DivisionService.getOne(idDivision, { with: "sub.sub" });
    },
  });

  if (isLoading) {
    return <div className="text-center">Loading..</div>;
  }

  if (isError || !division) {
    return (
      <div className="text-center ">
        <p>Error!</p>
        <Button
          onClick={() => {
            refetch();
          }}
          variant="destructive"
        >
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div>
      <DivisionView isChild={false} depth={0} division={division?.data as DivisionType} />
    </div>
  );
}

function DivisionView({ division, isChild, depth }: { division: DivisionType; isChild: boolean; depth: number }) {
  const { id, name, sub } = division;

  return (
    <div key={id}>
      <div className="relative overflow-hidden flex items-center gap-2 border border-border pl-4 p-2 rounded">
        <div
          className={cn("absolute w-1 top-0 bottom-0 left-0", {
            "bg-indigo-500": isChild && depth % 2 === 0,
            "bg-indigo-400": !isChild,
            "bg-orange-500": isChild && depth % 2 !== 0,
            // "bg-indigo-500": !isChild && depth % 2 !== 0,
          })}
        />
        <div className="text-xs">
          <span className="capitalize font-medium">{name}</span>
        </div>
      </div>

      {sub && (
        <div className="ml-10 mt-1 flex flex-col gap-1">
          {sub.map((child) => (
            <DivisionView key={child.id} division={child} isChild depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DetailDivision;

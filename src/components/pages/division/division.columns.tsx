"use client";

import Division from "@/types/division.types";
import { ColumnDef } from "@tanstack/react-table";
import ActionDivision from "./division.action";

export const columnDivision: ColumnDef<Division>[] = [
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => {
      return row.original.name;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <ActionDivision divisions={row.original} />;
    },
  },
];

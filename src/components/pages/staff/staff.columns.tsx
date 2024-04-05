"use client";

import { ColumnDef } from "@tanstack/react-table";
import Staff from "@/types/staff.types";
import ActionStaff from "./staff.action";

export const columnStaff: ColumnDef<Staff>[] = [
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => {
      return row.original.nama;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <ActionStaff staff={row.original} />;
    },
  },
];

"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../ui/loading";
import ErrorRender from "../../ui/error";
import { DataTable } from "../../ui/data-table";
import Paginate from "../../ui/paginate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columnStaff } from "./staff.columns";
import StaffService from "@/services/staff.service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function StaffPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const pathname = usePathname();
  const { push } = useRouter();
  const {
    data: division,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["staff", page],
    queryFn: async () => {
      return await StaffService.getAll({ page });
    },
  });

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="px-20">
      <div className="py-5 flex justify-between">
        <h1 className="text-xl md:text-2xl font-bold">Staff</h1>
        <Button asChild>
          <Link href="/staff/add">Create Staff</Link>
        </Button>
      </div>
      <div className="border rounded-lg p-5">
        {isLoading ? (
          <Loading />
        ) : isError && !isFetching ? (
          <ErrorRender refetch={refetch} />
        ) : division?.meta.total === 0 ? (
          <div className="flex justify-center">
            <div className="text-center space-y-2">
              <p>Data Kosong</p>
            </div>
          </div>
        ) : (
          <>
            <DataTable columns={columnStaff} data={division?.data} />
            <div className="mt-5">
              <Paginate
                currentPage={parseInt(page)}
                handlePageChange={handlePageChange}
                totalPages={Math.ceil((division?.meta.total as number) / (division?.meta.per_page as number))}
                visiblePage={3}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StaffPage;

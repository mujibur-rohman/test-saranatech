"use client";
import DivisionService from "@/services/division.service";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Loading from "../../ui/loading";
import ErrorRender from "../../ui/error";
import { DataTable } from "../../ui/data-table";
import Paginate from "../../ui/paginate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columnStaff } from "./staff.columns";
import StaffService from "@/services/staff.service";

function StaffPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: division,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["staff", currentPage],
    queryFn: async () => {
      return await StaffService.getAll({ page: currentPage });
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
                currentPage={currentPage}
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

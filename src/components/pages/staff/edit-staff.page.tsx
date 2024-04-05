"use client";

import ErrorRender from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import StaffService from "@/services/staff.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import EditFormStaff from "./edit-form";

function EditStaffPage() {
  const { staffId } = useParams();
  const {
    data: staff,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["staff", staffId],
    queryFn: async () => {
      return await StaffService.getOne(parseInt(staffId as string), {
        with: "divisi.sub",
      });
    },
  });

  return (
    <div className="px-20 space-y-5 pt-10">
      {isLoading ? (
        <Loading />
      ) : isError && !isFetching ? (
        <ErrorRender refetch={refetch} />
      ) : !staff ? (
        <div className="flex justify-center">
          <div className="text-center space-y-2">
            <p>Data Tidak Ditemukan</p>
          </div>
        </div>
      ) : (
        <EditFormStaff staff={staff.data} />
      )}
    </div>
  );
}

export default EditStaffPage;

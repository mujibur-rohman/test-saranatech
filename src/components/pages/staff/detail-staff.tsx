"use client";

import ErrorRender from "@/components/ui/error";
import StaffService from "@/services/staff.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import "moment/locale/id";
import moment from "moment";

function DetailStaff({ staffId }: { staffId: number }) {
  const {
    data: staff,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["staff", staffId],
    queryFn: async () => {
      return await StaffService.getOne(staffId, {
        with: "divisi.sub",
      });
    },
  });

  return (
    <div className="space-y-5">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : isError && !isFetching ? (
        <ErrorRender refetch={refetch} />
      ) : !staff ? (
        <div className="flex justify-center">
          <div className="text-center space-y-2">
            <p>Data Tidak Ditemukan</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-medium">Nama</label>
            <p>{staff.data.nama}</p>
          </div>
          <div>
            <label className="font-medium">KTP</label>
            <p>{staff.data.ktp}</p>
          </div>
          <div>
            <label className="font-medium">Gender</label>
            <p>{staff.data.gender}</p>
          </div>
          <div>
            <label className="font-medium">Tanggal Lahir</label>
            <p>{moment(staff.data.tanggal_lahir).format("LL")}</p>
          </div>
          <div>
            <label className="font-medium">NIP</label>
            <p>{staff.data.nip}</p>
          </div>
          <div>
            <label className="font-medium">Divisi</label>
            <p>{staff.data.divisi?.name}</p>
          </div>
          <div>
            <label className="font-medium">Jabatan</label>
            <p>{staff.data.jabatan}</p>
          </div>
          <div>
            <label className="font-medium">No Tlp</label>
            <p>{staff.data.notelp}</p>
          </div>
          <div>
            <label className="font-medium">Status</label>
            <p>{staff.data.status}</p>
          </div>
          <div>
            <label className="font-medium">Tanggal Masuk</label>
            <p>{moment(staff.data.tanggal_masuk).format("LL")}</p>
          </div>
          <div>
            <label className="font-medium">Status Pernikahan</label>
            <p>{staff.data.status_pernikahan}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailStaff;

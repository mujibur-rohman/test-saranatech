import { DivisionType } from "@/lib/division";

type Staff = {
  id: number;
  division_id: number;
  nip: string;
  nama: string;
  email: string;
  notelp: string;
  status: string;
  jabatan: string;
  alamat: string;
  ktp: string;
  status_pernikahan: string;
  gender: string;
  npwp?: string;
  tanggal_lahir: Date;
  tanggal_masuk: Date;
  divisi?: DivisionType;
};

export default Staff;

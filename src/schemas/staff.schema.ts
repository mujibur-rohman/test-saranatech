import * as z from "zod";

export const addStaffSchema = z.object({
  division_id: z.string().min(1, "divisi harus diisi"),
  nip: z.string().min(1, "nip harus diisi"),
  nama: z.string().min(1, "nama harus diisi"),
  notelp: z.string().min(1, "notelp harus diisi"),
  status: z.string().min(1, "status harus diisi"),
  jabatan: z.string().min(1, "jabatan harus diisi"),
  alamat: z.string().min(1, "alamat harus diisi"),
  ktp: z.string().min(1, "ktp harus diisi"),
  tanggal_lahir: z
    .date()
    .nullable()
    .refine((val) => val, {
      message: "tanggal lahir harus diisi",
    }),
  tanggal_masuk: z
    .date()
    .nullable()
    .refine((val) => val, {
      message: "tanggal masuk harus diisi",
    }),
  status_pernikahan: z.string().min(1, "status pernikahan harus diisi"),
  email: z.string().min(1, "email harus diisi").email("email tidak valid"),
  gender: z.string().min(1, "email harus diisi"),
});

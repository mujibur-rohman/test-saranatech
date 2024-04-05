import errorResponse from "@/lib/error-response";
import { addStaffSchema } from "@/schemas/staff.schema";
import DivisionService from "@/services/division.service";
import StaffService from "@/services/staff.service";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import "moment/locale/id";
import Staff from "@/types/staff.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function EditFormStaff({ staff }: { staff: Staff }) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: division } = useQuery({
    queryKey: ["division"],
    queryFn: async () => {
      return await DivisionService.getAll({ page: 1 });
    },
  });

  const form = useForm<z.infer<typeof addStaffSchema>>({
    resolver: zodResolver(addStaffSchema),
    defaultValues: {
      division_id: staff.division_id.toString(),
      nip: staff.nip,
      nama: staff.nama,
      notelp: staff.notelp,
      status: staff.status,
      jabatan: staff.jabatan,
      alamat: staff.alamat,
      ktp: staff.ktp,
      tanggal_lahir: new Date(staff.tanggal_lahir),
      tanggal_masuk: new Date(staff.tanggal_masuk),
      status_pernikahan: staff.status_pernikahan,
      email: staff.email,
      gender: staff.gender,
    },
  });

  const onSubmit = async (values: z.infer<typeof addStaffSchema>) => {
    try {
      await StaffService.update(staff.id, {
        ...values,
        tanggal_lahir: moment(values.tanggal_lahir).format("YYYY-MM-DD"),
        tanggal_masuk: moment(values.tanggal_masuk).format("YYYY-MM-DD"),
      });
      await queryClient.invalidateQueries();
      toast.success("Berhasil diupdate");
      router.push("/staff");
    } catch (error: any) {
      errorResponse(error);
    }
  };
  return (
    <div className="px-20 space-y-5">
      <h1 className="mt-10 text-xl font-semibold">
        <span>Edit Staff</span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="division_id"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Divisi</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Divisi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {division?.data.map((div) => (
                      <SelectItem key={div.id} value={div.id.toString()}>
                        {div.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input
                      className={cn({
                        "border-destructive": form.formState.errors.nama,
                      })}
                      placeholder="Nama"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ktp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>KTP</FormLabel>
                  <FormControl>
                    <Input
                      className={cn({
                        "border-destructive": form.formState.errors.ktp,
                      })}
                      placeholder="KTP"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tanggal_lahir"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("pl-3 text-left font-normal w-full", !field.value && "text-muted-foreground", {
                            "border-destructive outline-destructive !ring-destructive": form.formState.errors.tanggal_lahir,
                          })}
                        >
                          {field.value ? moment(field.value).format("LL") : <span>Pilih Tanggal</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value as Date}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tanggal_masuk"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Masuk</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("pl-3 text-left font-normal w-full", !field.value && "text-muted-foreground", {
                            "border-destructive outline-destructive !ring-destructive": form.formState.errors.tanggal_lahir,
                          })}
                        >
                          {field.value ? moment(field.value).format("LL") : <span>Pilih Tanggal</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value as Date}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIP</FormLabel>
                  <FormControl>
                    <Input
                      className={cn({
                        "border-destructive": form.formState.errors.nip,
                      })}
                      placeholder="NIP"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notelp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Tlp</FormLabel>
                  <FormControl>
                    <Input
                      className={cn({
                        "border-destructive": form.formState.errors.notelp,
                      })}
                      placeholder="No Tlp"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input
                      className={cn({
                        "border-destructive": form.formState.errors.status,
                      })}
                      placeholder="Status"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jabatan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jabatan</FormLabel>
                  <FormControl>
                    <Input
                      className={cn({
                        "border-destructive": form.formState.errors.jabatan,
                      })}
                      placeholder="Jabatan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Input
                      className={cn({
                        "border-destructive": form.formState.errors.alamat,
                      })}
                      placeholder="Alamat"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className={cn({
                        "border-destructive": form.formState.errors.email,
                      })}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["Laki-laki", "Perempuan"].map((gen) => (
                        <SelectItem key={gen} value={gen}>
                          {gen}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status_pernikahan"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Status Pernikahan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["Lajang", "Menikah"].map((marital) => (
                        <SelectItem key={marital} value={marital}>
                          {marital}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={form.formState.isSubmitting} type="submit" className="!mt-4">
            {form.formState.isSubmitting ? "Load..." : "Simpan"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default EditFormStaff;

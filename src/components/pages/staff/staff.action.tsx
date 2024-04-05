import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import errorResponse from "@/lib/error-response";
import { Edit2Icon, EyeIcon, Loader2Icon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import Staff from "@/types/staff.types";
import StaffService from "@/services/staff.service";
import { useRouter } from "next/navigation";
import DetailStaff from "./detail-staff";

function ActionStaff({ staff }: { staff: Staff }) {
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [typeAction, setTypeAction] = useState<"edit" | "delete" | "detail" | null>(null);

  const queryClient = useQueryClient();
  const router = useRouter();

  const openChangeWrapper = (value: boolean) => {
    setOpenDialog(value);
  };

  const handleDelete = async () => {
    try {
      setIsLoadingDelete(true);
      await StaffService.delete(staff.id);
      toast.success("Berhasil Dihapus");
      queryClient.invalidateQueries();
      setOpenDialog(false);
    } catch (error: any) {
      errorResponse(error);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const renderContent = (val: typeof typeAction) => {
    switch (val) {
      case "detail":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Detail</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col justify-between">
              <DetailStaff staffId={staff.id} />
            </div>
          </>
        );
      case "delete":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Hapus</DialogTitle>
              <DialogDescription>Apakah yakin ingin menghapus data ini?</DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col md:flex-row gap-3 md:gap-0">
              <Button variant="secondary" size="sm" onClick={() => setOpenDialog(false)}>
                Batal
              </Button>
              <Button disabled={isLoadingDelete} onClick={handleDelete} variant="destructive" size="sm">
                {isLoadingDelete ? <Loader2Icon className="animate-spin" /> : "Yakin"}
              </Button>
            </DialogFooter>
          </>
        );
      default:
        return <div>-</div>;
    }
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={openChangeWrapper}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              router.push(`/staff/edit/${staff.id}`);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Edit2Icon className="w-4 h-4 text-foreground" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpenDialog(true);
              setTypeAction("detail");
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <EyeIcon className="w-4 h-4 text-foreground" /> Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setOpenDialog(true);
              setTypeAction("delete");
            }}
          >
            <DialogTrigger asChild>
              <>
                <TrashIcon className="w-4 h-4 text-foreground" />
                <span>Hapus</span>
              </>
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px]">{renderContent(typeAction)}</DialogContent>
    </Dialog>
  );
}

export default ActionStaff;

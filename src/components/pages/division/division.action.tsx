import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import errorResponse from "@/lib/error-response";
import DivisionService from "@/services/division.service";
import Division from "@/types/division.types";
import { Edit2Icon, EyeIcon, Loader2Icon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import DetailDivision from "./detail-division";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";

function ActionDivision({ divisions }: { divisions: Division }) {
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [editValue, setEditValue] = useState(divisions.name);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [typeAction, setTypeAction] = useState<"edit" | "delete" | "detail" | null>(null);

  const queryClient = useQueryClient();

  const openChangeWrapper = (value: boolean) => {
    setOpenDialog(value);
  };

  const handleDelete = async () => {
    try {
      setIsLoadingDelete(true);
      await DivisionService.delete(divisions.id);
      toast.success("Berhasil Dihapus");
      queryClient.invalidateQueries();
      setOpenDialog(false);
    } catch (error: any) {
      errorResponse(error);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const handleUpdate = async () => {
    try {
      if (editValue) {
        setIsLoadingUpdate(true);
        await DivisionService.update(divisions.id, { name: editValue });
        await queryClient.invalidateQueries({ queryKey: ["division"] });
        toast.success("Berhasil Diupdate");
        setOpenDialog(false);
      }
    } catch (error: any) {
      errorResponse(error);
    } finally {
      setIsLoadingUpdate(false);
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
              <ScrollArea className="max-h-56 flex flex-col gap-4 rounded-md mt-3">
                <DetailDivision idDivision={divisions.id} />
              </ScrollArea>
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
      case "edit":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Ubah Stok</DialogTitle>
              <DialogDescription>Stok ini akan diubah secara manual</DialogDescription>
            </DialogHeader>
            <Input
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value);
              }}
            />
            <DialogFooter className="flex flex-col md:flex-row gap-3 md:gap-0">
              <Button variant="secondary" size="sm" onClick={() => setOpenDialog(false)}>
                Batal
              </Button>
              <Button disabled={isLoadingUpdate} onClick={handleUpdate} size="sm">
                {isLoadingUpdate ? <Loader2Icon className="animate-spin" /> : "Simpan"}
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
              setOpenDialog(true);
              setTypeAction("edit");
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

export default ActionDivision;

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DivisionType, deleteDataById, managePayload, updateDataById, updateNameById } from "@/lib/division";
import errorResponse from "@/lib/error-response";
import DivisionService from "@/services/division.service";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function generateUniqueId(): number {
  return Math.floor(100000 + Math.random() * 900000);
}

function newData(firstData = false): DivisionType {
  return { id: firstData ? 1 : generateUniqueId(), name: "", division: null };
}

function AddDivision() {
  const [divisions, setDivisions] = useState<DivisionType[]>([newData(true)]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleAddSubDivision = (parentId: number) => {
    const updatedData = updateDataById(divisions, parentId, newData());
    setDivisions(updatedData);
  };

  const handleDeleteDivision = (parentId: number) => {
    const updatedData = deleteDataById(divisions, parentId);
    setDivisions(updatedData);
  };

  const handleAddDivision = () => {
    setDivisions((prev) => [...prev, newData()]);
  };

  const handleNameChange = (id: number, newName: string) => {
    const updatedData = updateNameById(divisions, id, newName);
    console.log(updatedData);
    setDivisions(updatedData);
  };

  const save = async () => {
    try {
      setIsLoading(true);
      const payload = managePayload(divisions);
      await DivisionService.create(payload);
      toast.success("Berhasil membuat divisi");
      router.push("/");
    } catch (error: any) {
      errorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-20 space-y-5">
      <h1 className="mt-10 text-xl font-semibold flex justify-between">
        <span>Create Division</span>
        <Button onClick={save}>Save</Button>
      </h1>
      <div className="border-t border-l pl-3 pt-5 space-y-2">
        {divisions.map((div, i) => (
          <InputRecursive
            onDeleteDivision={handleDeleteDivision}
            onAddDivision={handleAddSubDivision}
            key={div.id}
            div={div}
            onAddSubDivision={handleAddSubDivision}
            onNameChange={handleNameChange}
          />
        ))}
        <Button onClick={handleAddDivision} variant="secondary">
          Add Division
        </Button>
      </div>
    </div>
  );
}

function InputRecursive({
  div,
  onAddSubDivision,
  onNameChange,
  onAddDivision,
  onDeleteDivision,
}: {
  div: DivisionType;
  onAddSubDivision: (parentId: number) => void;
  onAddDivision: (parentId: number) => void;
  onDeleteDivision: (parentId: number) => void;
  onNameChange: (id: number, newName: string) => void;
}) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(div.id, e.target.value);
  };

  return (
    <>
      <div className="flex gap-2">
        <Input placeholder="Division Name" value={div.name} onChange={handleNameChange} />
        {div.id !== 1 && (
          <Button variant="destructive" onClick={() => onDeleteDivision(div.id)}>
            X
          </Button>
        )}
        <Button size="sm" variant="outline" onClick={() => onAddSubDivision(div.id)}>
          Create Sub Div
        </Button>
      </div>
      {div.division && (
        <div className="ml-10 border-l pl-3">
          {div.division.map((subDiv, i) => (
            <div key={subDiv.id} className="mt-2">
              <InputRecursive onDeleteDivision={onDeleteDivision} onAddDivision={onAddDivision} div={subDiv} onAddSubDivision={onAddSubDivision} onNameChange={onNameChange} />
            </div>
          ))}
          {div.division.length !== 0 && div.division !== null && (
            <Button className="mt-2" onClick={() => onAddDivision(div.id)} variant="secondary">
              Add Division
            </Button>
          )}
        </div>
      )}
    </>
  );
}

export default AddDivision;

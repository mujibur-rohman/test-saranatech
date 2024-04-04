"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form";

type DivisionType = {
  name: string;
  division: DivisionType[] | null;
};

function AddDivision() {
  const form = useForm<{ divisions: DivisionType[] }>({ defaultValues: { divisions: [{ name: "", division: [] }] } });
  const {
    fields: fieldsDiv,
    remove,
    append,
  } = useFieldArray({
    control: form.control,
    name: "divisions",
    keyName: "_id",
  });

  //   console.log(form.getValues());

  return (
    <div className="px-20 space-y-5">
      <h1 className="mt-10 text-xl font-semibold">Create Division</h1>
      <div className="border-t pt-5 space-y-2">
        <FormProvider {...form}>
          {fieldsDiv.map((div, i) => (
            <InputRecursive key={i} index={i} div={div} />
          ))}
        </FormProvider>
        <Button
          onClick={() => {
            append({ name: "", division: [] });
          }}
          variant="secondary"
        >
          Add Division
        </Button>
      </div>
    </div>
  );
}

function InputRecursive({ div, index }: { div: DivisionType; index: number }) {
  const form = useFormContext<{ name: string; division: any[] }[]>();
  const [divisions, setDivisions] = useState(div.division || []);

  //   const divisions = form.watch(`divisions[${index}]` as any);
  console.log(divisions);

  return (
    <>
      <div className="flex gap-2">
        <Input placeholder="Nama Divisi" {...form.control.register(`divisions[${index}].name` as any)} />
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            const value = [{ name: "", division: [] }] as any;
            form.setValue(`divisions[${index}].division` as any, value);
            setDivisions((prev) => [value, ...prev]);
          }}
        >
          Create Sub
        </Button>
      </div>
      {divisions?.length ? (
        <div className="space-y-2 ml-10 ">
          {divisions.map((div, i) => (
            <div key={i} className="mt-2">
              <InputRecursive index={i} div={div} />
            </div>
          ))}
          <Button
            onClick={() => {
              const value = [{ name: "", division: [] }] as any;
              form.setValue(`divisions[${index}].division` as any, value);
              setDivisions((prev) => [...prev, value]);
            }}
            variant="secondary"
          >
            Add Division
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default AddDivision;

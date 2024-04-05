export type DivisionType = {
  id: number;
  name: string;
  division: DivisionType[] | null;
  sub?: DivisionType[];
};

export function updateNameById(data: DivisionType[], targetId: number, newName: string) {
  const updatedData = JSON.parse(JSON.stringify(data));
  updateNameRecursive(updatedData, targetId, newName);
  return updatedData;
}

function updateNameRecursive(data: DivisionType[], targetId: number, newName: string) {
  for (const item of data) {
    if (item.id === targetId) {
      item.name = newName;
      return;
    }
    if (item.division) {
      updateNameRecursive(item.division, targetId, newName);
    }
  }
}

export function updateDataById(data: DivisionType[], targetId: number, newData: DivisionType) {
  const updatedData = JSON.parse(JSON.stringify(data));
  updateDataRecursive(updatedData, targetId, newData);
  return updatedData;
}

function updateDataRecursive(data: DivisionType[], targetId: number, newData: DivisionType) {
  for (const item of data) {
    if (item.id === targetId) {
      if (!item.division) {
        item.division = [];
      }
      item.division.push(newData);
      return;
    }
    if (item.division) {
      updateDataRecursive(item.division, targetId, newData);
    }
  }
}

export function deleteDataById(data: DivisionType[], targetId: number) {
  const updatedData = JSON.parse(JSON.stringify(data));
  deleteDataRecursive(updatedData, targetId);
  return updatedData;
}

function deleteDataRecursive(data: DivisionType[], targetId: number) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.id === targetId) {
      data.splice(i, 1); // Hapus item
      return;
    }
    if (item.division) {
      deleteDataRecursive(item.division, targetId);
    }
  }
}

export function managePayload(data: DivisionType[]) {
  if (data.length === 1) {
    const { id, ...rest } = data[0];
    return rest;
  }
  return data.map((item) => {
    const { id, ...rest } = item;
    const cleanedItem = { ...rest };
    if (item.division && item.division.length > 0) {
      cleanedItem.division = managePayload(item.division as DivisionType[]) as any;
    } else {
      // @ts-ignore
      delete cleanedItem.division;
    }
    return { name: rest.name };
  });
}

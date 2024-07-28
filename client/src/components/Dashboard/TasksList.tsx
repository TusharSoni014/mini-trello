import React, { useMemo, useState } from "react";
import { Button } from "../ui/button";
import ColumnItem from "./ColumnItem";
import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

export interface IColumn {
  id: string | number;
  title: string;
}

export default function TasksList() {
  const [columns, setColumns] = useState<Array<IColumn>>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const createColumn = () => {
    setColumns([
      ...columns,
      {
        id: Date.now(),
        title: "New Column " + columns.length,
      },
    ]);
    console.log(columns);
  };

  const onDragStart = (event: DragStartEvent) => {
    console.log(event);
  };
  return (
    <div className="flex flex-col">
      <div className="">
        <Button onClick={createColumn}>Add col</Button>
      </div>
      <DndContext onDragStart={onDragStart}>
        <div className="flex bg-white gap-3 p-3">
          <SortableContext items={columnsId}>
            {columns.map((column) => (
              <ColumnItem key={column.id} column={column} />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}

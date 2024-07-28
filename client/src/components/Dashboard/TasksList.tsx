import React, { useMemo, useState } from "react";
import { Button } from "../ui/button";
import ColumnItem from "./ColumnItem";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

export interface IColumn {
  id: string;
  title: string;
}

export interface ITask {
  id: string;
  columnId: string;
  content: string;
}

export default function TasksList() {
  const [columns, setColumns] = useState<Array<IColumn>>([
    {
      id: "todo",
      title: "To-Do",
    },
    {
      id: "under-review",
      title: "Under Review",
    },
    {
      id: "in-progress",
      title: "In Progress",
    },
    {
      id: "done",
      title: "Done",
    },
  ]);
  const [tasks, setTasks] = useState<Array<ITask>>([]);
  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const onDragStart = (event: DragStartEvent) => {
    console.log(event);
    if (event.active.data.current?.type === "task") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  };

  const createTask = (columnId: string) => {
    const newTask = {
      id: Math.random().toFixed(2).toString(),
      columnId: columnId,
      content: `lorem ipsum ${Math.random().toFixed(2).toString()}`,
    };
    setTasks([...tasks, newTask]);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-270px)] bg-white rounded-md">
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="flex gap-3 p-3 h-full">
          <SortableContext items={columnsId}>
            {columns.map((column) => (
              <ColumnItem
                createTask={createTask}
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.columnId === column.id)}
              />
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnItem
                createTask={createTask}
                column={activeColumn}
                tasks={tasks}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

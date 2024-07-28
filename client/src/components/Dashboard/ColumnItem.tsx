import React from "react";
import { IColumn } from "./TasksList";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { updateCreateTaskDrawerVisibility } from "@/lib/slices/app.slice";
import { ITaskSlice, updateStatus } from "@/lib/slices/task.slice";

export default function ColumnItem({ column }: { column: IColumn }) {
  const dispatch = useAppDispatch();
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "task",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging)
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="border border-red-500 w-full h-56"
      ></div>
    );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" w-full h-56 overflow-auto bg-white p-3 border"
    >
      <div {...attributes} {...listeners} className="border text-black/40">
        {column.title}
      </div>
      <div className="">
        <Button
          onClick={() => {
            dispatch(
              updateStatus(column.id as ITaskSlice["createForm"]["status"])
            );
            dispatch(updateCreateTaskDrawerVisibility(true));
          }}
          className="w-full my-3"
        >
          + Add Task
        </Button>
      </div>
    </div>
  );
}

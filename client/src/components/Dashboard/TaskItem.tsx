import React, { useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ITaskSlice } from "@/lib/slices/task.slice";

export default function TaskItem({ task }: { task: ITaskSlice["createForm"] }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id || "",
    data: {
      type: "task",
      task,
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
        {...attributes}
        {...listeners}
        style={style}
        className="w-full border-2 p-3 rounded-md bg-[#F9F9F9] opacity-30"
      >
        {task.title}
      </div>
    );
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="w-full border-2 p-3 rounded-md bg-[#F9F9F9]"
    >
      {task.title}
    </div>
  );
}

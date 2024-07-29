import React from "react";
import { ITask } from "./TasksList";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskItem({ task }: { task: ITask }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
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
        {task.content}
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
      {task.content}
    </div>
  );
}

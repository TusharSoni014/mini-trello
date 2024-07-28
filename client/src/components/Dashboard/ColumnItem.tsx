import React from "react";
import { IColumn } from "./TasksList";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function ColumnItem({ column }: { column: IColumn }) {
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
        className="border border-red-500 w-52 h-56 overflow-auto bg-white p-3"
      >
        
      </div>
    );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" w-52 h-56 overflow-auto bg-white p-3"
    >
      <div {...attributes} {...listeners} className="border text-black/40">
        {column.title}
      </div>
      <div className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti amet
        rerum ex, iusto dolore corporis necessitatibus earum! Eius consequuntur
        earum totam repellat, eveniet eligendi culpa maiores quas consectetur
        harum porro.
      </div>
    </div>
  );
}

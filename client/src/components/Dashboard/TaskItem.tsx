import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ITaskSlice } from "@/lib/slices/task.slice";
import { MdOutlineAccessTime } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

export default function TaskItem({ task }: { task: ITaskSlice["createForm"] }) {
  const timeAgo = task.createdAt
    ? formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })
    : "";
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
        style={style}
        className="w-full border-2 p-3 rounded-md bg-[#F9F9F9] flex gap-2.5 flex-col opacity-25"
      >
        <div className=" flex flex-col gap-0">
          <p
            {...attributes}
            {...listeners}
            className={`whitespace-pre text-black/70 font-semibold cursor-grabbing`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="whitespace-pre-wrap text-sm text-black/50">
              {task.description}
            </p>
          )}
        </div>
        {task.priority && (
          <div className="__priority w-full">
            <div
              className={`text-white font-semibold rounded-md capitalize p-2 text-xs w-fit py-1 ${
                task.priority === "low"
                  ? "bg-[#0ECC5A]"
                  : task.priority === "medium"
                  ? "bg-[#FFA235]"
                  : "bg-[#FF6B6B]"
              }`}
            >
              {task.priority}
            </div>
          </div>
        )}
        {task.deadline && (
          <div className="flex gap-1.5 justify-start items-center text-sm text-black/80 font-semibold">
            <MdOutlineAccessTime />
            {new Date(task.deadline).toISOString().split("T")[0]}{" "}
          </div>
        )}
        <div className="text-xs font-semibold text-black/60">{timeAgo}</div>
      </div>
    );
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full border-2 p-3 rounded-md bg-[#F9F9F9] flex gap-2.5 flex-col"
    >
      <div className=" flex flex-col gap-0">
        <p
          {...attributes}
          {...listeners}
          className={`whitespace-pre text-black/70 font-semibold cursor-grab`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="whitespace-pre-wrap text-sm text-black/50">
            {task.description}
          </p>
        )}
      </div>
      {task.priority && (
        <div className="__priority w-full">
          <div
            className={`text-white font-semibold rounded-md capitalize p-2 text-xs w-fit py-1 ${
              task.priority === "low"
                ? "bg-[#0ECC5A]"
                : task.priority === "medium"
                ? "bg-[#FFA235]"
                : "bg-[#FF6B6B]"
            }`}
          >
            {task.priority}
          </div>
        </div>
      )}
      {task.deadline && (
        <div className="flex gap-1.5 justify-start items-center text-sm text-black/80 font-semibold">
          <MdOutlineAccessTime />
          {new Date(task.deadline).toISOString().split("T")[0]}{" "}
        </div>
      )}
      <div className="text-xs font-semibold text-black/60 flex justify-between items-center">
        {timeAgo}
        <div className="flex gap-1.5">
          <MdOutlineEdit
            className="cursor-pointer transition-colors hover:text-green-500"
            onClick={() => console.log(task)}
          />
          <FaRegTrashAlt
            className="cursor-pointer transition-colors hover:text-red-500"
            onClick={() => console.log(task)}
          />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  fetchMyTasksThunk,
  ITaskSlice,
  updateDeadline,
  updateDescription,
  updateEditId,
  updatePriority,
  updateStatus,
  updateTitle,
} from "@/lib/slices/task.slice";
import { MdOutlineAccessTime } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useAppDispatch } from "@/lib/hooks";
import { updateCreateTaskDrawerVisibility } from "@/lib/slices/app.slice";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function TaskItem({ task }: { task: ITaskSlice["createForm"] }) {
  const dispatch = useAppDispatch();
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

  const handleEditTask = () => {
    dispatch(updateEditId(task._id || ""));
    dispatch(updateTitle(task.title));
    dispatch(updateDescription(task.description));
    dispatch(updateDeadline(task.deadline));
    dispatch(updatePriority(task.priority));
    dispatch(updateStatus(task.status));
    dispatch(updateCreateTaskDrawerVisibility(true));
  };

  const handleDeleteTask = async () => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/task/delete/${task._id}`
    );
    dispatch(fetchMyTasksThunk());
  };

  if (isDragging)
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-full border-4 border-dotted p-3 rounded-md bg-[#F9F9F9] flex gap-2.5 flex-col opacity-25"
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
            onClick={handleEditTask}
          />
          <FaRegTrashAlt
            className="cursor-pointer transition-colors hover:text-red-500"
            onClick={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
}

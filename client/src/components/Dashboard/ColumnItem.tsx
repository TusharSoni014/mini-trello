import React, { useMemo, useState } from "react";
import { IColumn, ITask } from "./TasksList";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import TaskItem from "./TaskItem";
import { IoMdList } from "react-icons/io";
import { ITaskSlice, updateStatus } from "@/lib/slices/task.slice";
import { updateCreateTaskDrawerVisibility } from "@/lib/slices/app.slice";
import { GoPlus } from "react-icons/go";

export default function ColumnItem({
  column,
  tasks,
}: {
  column: IColumn;
  tasks: Array<ITask>;
}) {
  const tasksRedux = useAppSelector((state) => state.taskSlice.myTasks);
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);
  const dispatch = useAppDispatch();
  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: "column",
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
      className=" w-full h-full overflow-auto bg-white flex flex-col gap-3"
    >
      <div className="text-black/60 flex justify-between items-center">
        {column.title}
        <IoMdList />
      </div>
      <div className="border-red-500 overflow-scroll flex flex-col gap-3">
        <SortableContext items={tasksIds}>
          {tasksRedux[column.id as keyof typeof tasksRedux].map(
            (task, index) => (
              <TaskItem key={index} task={task} />
            )
          )}
        </SortableContext>
      </div>
      <div className="">
        <Button
          onClick={() => {
            dispatch(
              updateStatus(column.id as ITaskSlice["createForm"]["status"])
            );
            dispatch(updateCreateTaskDrawerVisibility(true));
          }}
          className="w-full bg-gradient-to-t from-[#202020] to-[#3A3A3A] flex justify-between items-center px-2.5"
        >
          Add Task <GoPlus size={20}/>
        </Button>
      </div>
    </div>
  );
}

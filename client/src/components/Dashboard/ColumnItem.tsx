import React, { useMemo } from "react";
import { IColumn, ITask } from "./TasksList";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/hooks";
import TaskItem from "./TaskItem";
import { IoMdList } from "react-icons/io";

export default function ColumnItem({
  column,
  createTask,
  tasks,
}: {
  column: IColumn;
  createTask: (columnId: string) => void;
  tasks: Array<ITask>;
}) {
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);
  const dispatch = useAppDispatch();
  const {
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
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
      <div className="border-red-500 overflow-scroll">
        <SortableContext items={tasksIds}>
          {tasks.map((task, index) => (
            <TaskItem key={index} task={task} />
          ))}
        </SortableContext>
      </div>
      <div className="">
        <Button
          // onClick={() => {
          //   dispatch(
          //     updateStatus(column.id as ITaskSlice["createForm"]["status"])
          //   );
          //   dispatch(updateCreateTaskDrawerVisibility(true));
          // }}
          onClick={() => createTask(column.id)}
          className="w-full bg-gradient-to-t from-[#202020] to-[#3A3A3A]"
        >
          + Add Task
        </Button>
      </div>
    </div>
  );
}

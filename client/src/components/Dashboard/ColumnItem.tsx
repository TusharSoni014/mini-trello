import React, { useMemo } from "react";
import { IColumn, ITask } from "./TasksList";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/hooks";
import TaskItem from "./TaskItem";

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
        style={style}
        className="border border-red-500 w-full h-56"
      ></div>
    );

  return (
    <div
      style={style}
      className=" w-full h-full overflow-y-auto bg-white p-3 border flex flex-col"
    >
      <div className="border text-black/40">
        {column.title}
      </div>
      <div className="flex-grow border border-red-500 overflow-scroll">
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
          className="w-full mt-3"
        >
          + Add Task
        </Button>
      </div>
    </div>
  );
}

import React, { useMemo, useState } from "react";
import ColumnItem from "./ColumnItem";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskItem from "./TaskItem";
import {
  ITaskSlice,
  updateTaskPosition,
  updateTaskPositionThunk,
} from "@/lib/slices/task.slice";
import { useAppDispatch } from "@/lib/hooks";

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
  const [activeTask, setActiveTask] = useState<ITaskSlice["createForm"] | null>(
    null
  );
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const dispatch = useAppDispatch();

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current.task);
    }
  };

  // const onDragEnd = (event: DragEndEvent) => {
  //   setActiveTask(null);
  //   const { active, over } = event;
  //   if (!over) return;

  //   const taskId = active.id as string;
  //   const newColumnId = over.id as ITaskSlice["createForm"]["status"];
  //   const newIndex = 0; // Or calculate the correct index

  //   if (["todo", "under-review", "in-progress", "done"].includes(newColumnId)) {
  //     dispatch(updateTaskPosition({ taskId, newColumnId, newIndex }));
  //     dispatch(updateTaskPositionThunk({ taskId, newColumnId, newIndex }));
  //   }
  // };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    let newColumnId: ITaskSlice["createForm"]["status"];
    let newIndex: number;

    if (over.data.current?.type === "column") {
      newColumnId = over.id as ITaskSlice["createForm"]["status"];
      newIndex = columns.findIndex((col) => col.id === newColumnId);
    } else {
      const overTask = over.data.current?.task as ITaskSlice["createForm"];
      newColumnId = overTask.status;
      newIndex = tasks.findIndex((task) => task.id === over.id);
    }

    if (["todo", "under-review", "in-progress", "done"].includes(newColumnId)) {
      dispatch(updateTaskPosition({ taskId, newColumnId, newIndex }));
      dispatch(updateTaskPositionThunk({ taskId, newColumnId }));
    }
  };

  // const onDragOver = (event: DragOverEvent) => {
  //   const { active, over } = event;
  //   if (!over) return;

  //   const activeId = active.id;
  //   const overId = over.id;

  //   if (activeId === overId) {
  //     return;
  //   }
  //   const isActiveATask = active.data.current?.type === "task";
  //   const isOverATask = over.data.current?.type === "task";

  //   if (!isActiveATask) {
  //     return;
  //   }
  //   if (isActiveATask && isOverATask) {
  //     setTasks((tasks) => {
  //       const activeIndex = tasks.findIndex((t) => t.id === activeId);
  //       const overIndex = tasks.findIndex((t) => t.id === overId);
  //       tasks[activeIndex].columnId = tasks[overIndex].columnId;
  //       return arrayMove(tasks, activeIndex, overIndex);
  //     });
  //   }
  //   const isOverAColumn = over.data.current?.type === "column";
  //   if (isActiveATask && isOverAColumn) {
  //     setTasks((tasks) => {
  //       const activeIndex = tasks.findIndex((t) => t.id === activeId);
  //       tasks[activeIndex].columnId = overId.toString();
  //       return arrayMove(tasks, activeIndex, activeIndex);
  //     });
  //   }
  // };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "task";
    const isOverATask = over.data.current?.type === "task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (activeIndex === -1 || overIndex === -1) return tasks;

        const newTasks = [...tasks];
        const activeTask = newTasks[activeIndex];
        const overTask = newTasks[overIndex];

        activeTask.columnId = overTask.columnId;

        return arrayMove(newTasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "column";
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        if (activeIndex === -1) return tasks;

        const newTasks = [...tasks];
        newTasks[activeIndex].columnId = overId.toString();
        return newTasks;
      });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-270px)] bg-white rounded-md">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 p-3 h-full">
          <SortableContext items={columnsId}>
            {columns.map((column) => (
              <ColumnItem
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.columnId === column.id)}
              />
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeTask && <TaskItem task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

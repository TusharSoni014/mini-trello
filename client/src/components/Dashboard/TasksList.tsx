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
  const [activeTask, setActiveTask] = useState<ITask | null>(null);
  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const onDragStart = (event: DragStartEvent) => {
    console.log(event.active.data.current?.type);
    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const createTask = (columnId: string) => {
    const newTask = {
      id: Math.random().toFixed(2).toString(),
      columnId: columnId,
      content: `lorem ipsum ${Math.random().toFixed(2).toString()}`,
    };
    setTasks([...tasks, newTask]);
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) {
      return;
    }
    const isActiveATask = active.data.current?.type === "task";
    const isOverATask = over.data.current?.type === "task";

    if (!isActiveATask) {
      return;
    }
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }
    const isOverAColumn = over.data.current?.type === "column";
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId.toString();
        return arrayMove(tasks, activeIndex, activeIndex);
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
        <div className="flex gap-3 p-3 h-full">
          <SortableContext items={columnsId}>
            {columns.map((column) => (
              <ColumnItem
                createTask={createTask}
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.columnId === column.id)}
              />
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnItem
                createTask={createTask}
                column={activeColumn}
                tasks={tasks}
              />
            )}
            {activeTask && <TaskItem task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

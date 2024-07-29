"use client";

import SideBar from "@/components/Dashboard/SideBar";
import TaskManager from "@/components/Dashboard/TaskManager";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchMyTasksThunk } from "@/lib/slices/task.slice";
import React, { useEffect } from "react";

export default function Page() {
  const { loading, handleLogout } = useAuth();
  const { currentUser } = useAppSelector((state) => state.appSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loading && !currentUser) {
      handleLogout();
      return;
    }
    dispatch(fetchMyTasksThunk());
  }, [currentUser, loading, handleLogout, dispatch]);

  if (loading)
    return (
      <div className="flex flex-row gap-2 w-full h-screen justify-center items-center">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );

  return (
    <div className="w-full h-screen flex">
      <SideBar handleLogout={handleLogout} currentUser={currentUser} />
      <TaskManager currentUser={currentUser} />
    </div>
  );
}

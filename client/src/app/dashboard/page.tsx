"use client";

import SideBar from "@/components/Dashboard/SideBar";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";
import { BiLoaderAlt } from "react-icons/bi";

export default function Page() {
  const { loading, handleLogout } = useAuth();
  const { currentUser } = useAppSelector((state) => state.appSlice);
  useEffect(() => {
    if (!loading && !currentUser) {
      handleLogout();
    }
  }, [currentUser, loading, handleLogout]);

  if (loading)
    return (
      <div className="flex flex-row gap-2 w-full h-screen justify-center items-center">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );

  return (
    <div className="w-full h-screen">
      <SideBar handleLogout={handleLogout} currentUser={currentUser} />
    </div>
  );
}

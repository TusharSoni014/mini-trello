"use client";

import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
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
      <div className="w-full h-screen flex justify-center items-center">
        <BiLoaderAlt className="animate-spin" />
      </div>
    );

  return (
    <div className="w-full h-screen">
      <div className="__left w-72 border px-4 h-full pt-6 pb-8 bg-white ">
        <div className="w-full flex gap-3 justify-start items-center">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden ">
            <Image fill={true} src={currentUser?.picture || ""} alt="" />
          </div>
          <p className="capitalize font-bold">{currentUser?.username}</p>
        </div>
      </div>
    </div>
  );
}

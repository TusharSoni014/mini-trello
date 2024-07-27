"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateCurrentUser } from "@/lib/slices/app.slice";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { currentUser } = useAppSelector((state) => state.appSlice);
  return (
    <div className="w-full h-screen">
      <div className="__left w-72 border px-4 h-full pt-[70px] pb-8 bg-white ">
        <div className="w-full flex gap-3 justify-start items-center">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden ">
            <Image fill={true} src={currentUser?.picture || ""} alt="" />
          </div>
          <p className="capitalize font-bold">
            {currentUser?.username}
          </p>
        </div>
      </div>
    </div>
  );
}

import { IAppSlice } from "@/lib/slices/app.slice";
import { MdOutlineHelpOutline } from "react-icons/md";
import React from "react";
import IntroIcon from "./icons/IntroIcon";

export default function TaskManager({
  currentUser,
}: {
  currentUser: IAppSlice["currentUser"];
}) {
  return (
    <div className="p-3 w-full h-screen overflow-auto bg-black/5">
      <div className="__header py-3 w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Good morning,{" "}
          <span className="capitalize">{currentUser?.username}!</span>
        </h1>
        <div className=" flex gap-1 text-sm justify-center items-center ">
          Help & feedback <MdOutlineHelpOutline />
        </div>
      </div>
      <div className="__cards flex gap-3">
        <div className="__card rounded-lg p-4 bg-white flex gap-3 w-1/3 justify-center items-center">
          <div className="shrink-0">
            <IntroIcon />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-black/70 font-semibold">Introducing tags</h3>
            <p className="text-black/40 text-xs">
              Easily categorize and find your notes by adding tags. Keep your
              workspace clutter-free and efficient.
            </p>
          </div>
        </div>
        <div className="__card rounded-lg p-4 bg-white flex gap-3 w-1/3 justify-center items-center">
          <div className="shrink-0">
            <IntroIcon />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-black/70 font-semibold">Introducing tags</h3>
            <p className="text-black/40 text-xs">
              Easily categorize and find your notes by adding tags. Keep your
              workspace clutter-free and efficient.
            </p>
          </div>
        </div>
        <div className="__card rounded-lg p-4 bg-white flex gap-3 w-1/3 justify-center items-center">
          <div className="shrink-0">
            <IntroIcon />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-black/70 font-semibold">Introducing tags</h3>
            <p className="text-black/40 text-xs">
              Easily categorize and find your notes by adding tags. Keep your
              workspace clutter-free and efficient.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";
import { Button } from "../ui/button";
import { MdOutlineDateRange } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { updateCreateTaskDrawerVisibility } from "@/lib/slices/app.slice";
import { useAppDispatch } from "@/lib/hooks";
import { IoIosAddCircle } from "react-icons/io";

export default function FunctionBar() {
  const dispatch = useAppDispatch();
  return (
    <div className="w-full flex justify-between items-center">
      <div className="__search w-fit bg-white rounded-md flex justify-center items-center overflow-hidden border">
        <Input
          className="focus-visible:ring-0 shadow-none border-none rounded-none w-[150px] pr-0"
          placeholder="Search"
        />
        <div className="p-2">
          <CiSearch size={20} />
        </div>
      </div>
      <div className="__toolbar flex gap-5 justify-center items-center">
        <Button size="sm" variant="ghost" className="text-black/40 w-fit p-0">
          Calendar view <MdOutlineDateRange size={20} />
        </Button>
        <Button size="sm" variant="ghost" className="text-black/40 w-fit p-0">
          Automation <BsStars size={18} />
        </Button>
        <Button size="sm" variant="ghost" className="text-black/40 w-fit p-0">
          Filter <CiFilter size={20} />
        </Button>
        <Button size="sm" variant="ghost" className="text-black/40 w-fit p-0">
          Share <IoShareSocialOutline size={18} />
        </Button>
        <Button
          onClick={() => dispatch(updateCreateTaskDrawerVisibility(true))}
          className="w-fit gap-1"
          variant="purple-gradient"
          size="sm"
        >
          Create new
          <IoIosAddCircle />
        </Button>
      </div>
    </div>
  );
}

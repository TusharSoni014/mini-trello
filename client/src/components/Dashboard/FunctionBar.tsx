import React from "react";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";

export default function FunctionBar() {
  return (
    <div className="w-full border border-red-500 flex justify-between items-center">
      <div className="__search w-fit bg-white rounded-md flex justify-center items-center overflow-hidden">
        <Input
          className="focus-visible:ring-0 shadow-none border-none rounded-none w-[150px] pr-0"
          placeholder="Search"
        />
        <div className="p-2">
          <CiSearch size={20}/>
        </div>
      </div>
    </div>
  );
}

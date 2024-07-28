"use client";

import {
  IAppSlice,
  updateCreateTaskDrawerVisibility,
} from "@/lib/slices/app.slice";
import Image from "next/image";
import { BsExclamationDiamond } from "react-icons/bs";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LuBellDot } from "react-icons/lu";
import { FiLoader } from "react-icons/fi";
import { LuChevronsRight } from "react-icons/lu";
import { Button } from "../ui/button";
import { RxHome } from "react-icons/rx";
import { CiStar, CiViewBoard } from "react-icons/ci";
import { IoSettingsOutline, IoShareSocialOutline } from "react-icons/io5";
import { BiGroup } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa6";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IoCloseSharp } from "react-icons/io5";
import { LuMaximize2 } from "react-icons/lu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { ITaskSlice, updateStatus } from "@/lib/slices/task.slice";

export default function SideBar({
  currentUser,
  handleLogout,
}: {
  currentUser: IAppSlice["currentUser"];
  handleLogout: () => Promise<void>;
}) {
  const { createTaskDrawerVisiblity } = useAppSelector(
    (state) => state.appSlice
  );
  const {
    createForm: { status },
  } = useAppSelector((state) => state.taskSlice);
  const dispatch = useAppDispatch();
  const menuItems: Array<{
    name: string;
    icon: React.ReactNode;
    href: string;
    active: boolean;
  }> = [
    {
      name: "Home",
      icon: <RxHome size={20} />,
      href: "/dashboard",
      active: true,
    },
    {
      name: "Boards",
      icon: <CiViewBoard size={20} />,
      href: "#",
      active: false,
    },
    {
      name: "Settings",
      icon: <IoSettingsOutline size={20} />,
      href: "#",
      active: false,
    },
    {
      name: "Teams",
      icon: <BiGroup size={20} />,
      href: "#",
      active: false,
    },
    {
      name: "Analytics",
      icon: <FaChartLine size={20} />,
      href: "#",
      active: false,
    },
  ];
  return (
    <div className="__left w-72 border px-4 h-full pt-6 pb-8 bg-white ">
      <div className="w-full flex gap-3 justify-start items-center">
        <div className="relative w-8 h-8 rounded-lg overflow-hidden ">
          <Image fill={true} src={currentUser?.picture || ""} alt="" />
        </div>
        <p className="capitalize font-bold">{currentUser?.username}</p>
      </div>
      <div className="w-full  py-2 flex justify-between items-center">
        <div className="flex gap-2">
          <LuBellDot size={20} />
          <FiLoader size={20} />
          <LuChevronsRight size={20} />
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="text-black/60"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <div className="py-2 w-full flex flex-col gap-0.5">
        {menuItems.map((item, index) => {
          return (
            <Link key={index} href={item.href} className="w-full">
              <Button
                className={`flex w-full px-2 gap-2 justify-start border-transparent border hover:border-border ${
                  item.active && "bg-black/5"
                }`}
                variant="ghost"
              >
                {item.icon}
                <p>{item.name}</p>
              </Button>
            </Link>
          );
        })}
      </div>
      <Sheet
        open={createTaskDrawerVisiblity}
        onOpenChange={(state) =>
          dispatch(updateCreateTaskDrawerVisibility(state))
        }
      >
        <SheetTrigger asChild>
          <Button
            onClick={() => dispatch(updateCreateTaskDrawerVisibility(true))}
            className="w-full gap-1"
            variant="purple-gradient"
          >
            Create new task <IoIosAddCircle />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="md:w-full !max-w-[500px] p-5 flex flex-col gap-7"
        >
          <SheetHeader>
            <SheetTitle className="flex justify-between items-center">
              <div className="flex gap-3 justify-center items-center ">
                <SheetClose className="cursor-pointer" asChild>
                  <IoCloseSharp />
                </SheetClose>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-1 h-full px-0 w-fit hover:bg-transparent"
                >
                  <LuMaximize2 />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="text-black/60">
                  Share
                  <IoShareSocialOutline size={18} />
                </Button>
                <Button variant="secondary" size="sm" className="text-black/60">
                  Favorite
                  <CiStar size={18} />
                </Button>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="w-full">
            <Input
              placeholder="Title"
              className="w-full text-4xl rounded-none focus-visible:ring-0 outline-none placeholder:text-black/30 font-semibold h-14 shadow-none border-none pl-0"
            />
            <div className="__options mt-4">
              <div className="flex">
                <div className="flex gap-5 items-center text-black/60 w-[200px] justify-start">
                  <FiLoader />
                  <p className="text-sm">Status</p>
                </div>
                <Select
                  value={status}
                  onValueChange={(val: ITaskSlice["createForm"]["status"]) =>
                    dispatch(updateStatus(val))
                  }
                >
                  <SelectTrigger
                    className={`w-full shadow-none border-none focus:ring-0 text-black/40 ${
                      status && "text-black"
                    }`}
                  >
                    <SelectValue placeholder="Not selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To-Do</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex">
                <div className="flex gap-5 items-center text-black/60 w-[200px] justify-start">
                <BsExclamationDiamond />
                  <p className="text-sm">Priority</p>
                </div>
                <Select
                  value={status}
                  onValueChange={(val: ITaskSlice["createForm"]["status"]) =>
                    dispatch(updateStatus(val))
                  }
                >
                  <SelectTrigger
                    className={`w-full shadow-none border-none focus:ring-0 text-black/40 ${
                      status && "text-black"
                    }`}
                  >
                    <SelectValue placeholder="Not selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To-Do</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

"use client";

import {
  IAppSlice,
  updateCreateTaskDrawerVisibility,
} from "@/lib/slices/app.slice";
import Image from "next/image";
import { BsExclamationDiamond } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { IoIosAdd } from "react-icons/io";
import React, { useEffect } from "react";
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
import { format } from "date-fns";
import { RxHome } from "react-icons/rx";
import { CiStar, CiViewBoard } from "react-icons/ci";
import { IoSettingsOutline, IoShareSocialOutline } from "react-icons/io5";
import { BiGroup, BiLoader } from "react-icons/bi";
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
import {
  fetchMyTasksThunk,
  ITaskSlice,
  updateDeadline,
  updateDescription,
  updateEditId,
  updatePriority,
  updateStatus,
  updateTitle,
} from "@/lib/slices/task.slice";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { toast } from "sonner";
import axios from "axios";
import { showErrorToast } from "../ui/show-error-toast";
axios.defaults.withCredentials = true;

export default function SideBar({
  currentUser,
  handleLogout,
}: {
  currentUser: IAppSlice["currentUser"];
  handleLogout: () => Promise<void>;
}) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [createLoading, setCreateLoading] = React.useState(false);
  const { createTaskDrawerVisiblity } = useAppSelector(
    (state) => state.appSlice
  );
  const { status, priority, title, deadline, description } = useAppSelector(
    (state) => state.taskSlice.createForm
  );
  const { editId } = useAppSelector((state) => state.taskSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleCreateNote = async () => {
      if (title === "" || status === "") {
        toast("Title and Status are required!");
        return;
      }
      const taskData: ITaskSlice["createForm"] = {
        title: title,
        status: status,
      };
      if (deadline) taskData.deadline = deadline;
      if (description) taskData.description = description;
      if (priority) taskData.priority = priority;

      setCreateLoading(true);

      try {
        axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/task/create`,
          taskData
        );
        await dispatch(fetchMyTasksThunk());
        dispatch(updateTitle(""));
        dispatch(updateDeadline(""));
        dispatch(updateDescription(""));
        dispatch(updatePriority(""));
        dispatch(updateStatus(""));
        toast("Task created successfully!");
        dispatch(updateCreateTaskDrawerVisibility(false));
      } catch (error) {
        showErrorToast(error);
      } finally {
        setCreateLoading(false);
      }
    };

    const handleEditNote = async () => {
      const taskData: ITaskSlice["createForm"] = {
        title: title,
        status: status,
      };
      if (deadline) taskData.deadline = deadline;
      if (description) taskData.description = description;
      if (priority) taskData.priority = priority;

      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/task/edit/${editId}`,
        taskData
      );
      await dispatch(fetchMyTasksThunk());
      dispatch(updateTitle(""));
      dispatch(updateDeadline(""));
      dispatch(updateDescription(""));
      dispatch(updatePriority(""));
      dispatch(updateStatus(""));
      dispatch(updateEditId(null));
      toast("Task edited successfully!");
      dispatch(updateCreateTaskDrawerVisibility(false));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && createTaskDrawerVisiblity) {
        if (editId) {
          handleEditNote();
        } else {
          handleCreateNote();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    dispatch,
    createTaskDrawerVisiblity,
    title,
    status,
    deadline,
    description,
    priority,
    editId,
  ]);

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
    <div className="__left w-60 border px-4 h-full pt-6 pb-8 bg-white ">
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
          <div
            style={{
              pointerEvents: createLoading ? "all" : "none",
              opacity: createLoading ? "1" : "0",
            }}
            className="absolute transition left-0 top-0 p-5 bg-white/30 backdrop-blur-sm w-full h-full flex justify-center items-center gap-3"
          >
            Creating
            <BiLoader className="animate-spin" />
          </div>
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
              value={title}
              onChange={(e) => dispatch(updateTitle(e.target.value))}
            />
            <div className="__options mt-4 flex flex-col gap-2.5">
              <div className="flex">
                <div className="flex gap-5 items-center text-black/60 w-[200px] justify-start">
                  <FiLoader />
                  <p className="text-sm">Status</p>
                </div>
                <Select
                  value={status}
                  onValueChange={(val) =>
                    dispatch(
                      updateStatus(val as ITaskSlice["createForm"]["status"])
                    )
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
                  value={priority}
                  onValueChange={(val) =>
                    dispatch(
                      updatePriority(
                        val as ITaskSlice["createForm"]["priority"]
                      )
                    )
                  }
                >
                  <SelectTrigger
                    className={`w-full shadow-none border-none focus:ring-0 text-black/40 ${
                      priority && "text-black"
                    }`}
                  >
                    <SelectValue placeholder="Not selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex">
                <div className="flex gap-5 items-center text-black/60 w-[200px] justify-start">
                  <MdOutlineDateRange />
                  <p className="text-sm">Deadline</p>
                </div>
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-left font-normal text-sm text-black px-3 hover:bg-transparent",
                        !deadline && "text-black/40 hover:text-black/30"
                      )}
                    >
                      {deadline ? (
                        format(deadline, "PPP")
                      ) : (
                        <span>Not selected</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={deadline ? new Date(deadline) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          dispatch(updateDeadline(date.toISOString()));
                          setPopoverOpen(false);
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex">
                <div className="flex gap-5 items-center text-black/60 w-[200px] justify-start">
                  <GoPencil />
                  <p className="text-sm">Description</p>
                </div>
                <Input
                  value={description}
                  onChange={(e) => dispatch(updateDescription(e.target.value))}
                  className="shadow-none border-none focus-visible:ring-0 placeholder:text-black/40"
                  placeholder="Not selected"
                />
              </div>
            </div>
            <div className="mt-5 flex w-fit justify-center items-center gap-5">
              <IoIosAdd />
              <Button
                variant="link"
                className="w-fit h-fit p-0 rounded-none hover:no-underline"
              >
                Add Custom Property
              </Button>
            </div>
            <Separator className="my-5" />
            <p className="text-black/30 text-xs">
              Start writing, or drag your own files here.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

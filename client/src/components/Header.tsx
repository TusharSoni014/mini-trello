"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { BiLoaderAlt } from "react-icons/bi";
import { updateCurrentUser } from "@/lib/slices/app.slice";

export default function Header() {
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useAppSelector((state) => state.appSlice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/info`,
          {
            withCredentials: true,
          }
        );
        dispatch(updateCurrentUser(response.data));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleLogout = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/logout`,
      {},
      { withCredentials: true }
    );
    dispatch(updateCurrentUser(null));
  };

  return (
    <header className="fixed top-0 w-full h-[60px] px-3 bg-white text-black/80 font-bold text-xl flex justify-between items-center shadow">
      <p className="text-[#4534AC]">Workflo</p>
      {!currentUser && !loading ? (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      ) : loading ? (
        <>
          <BiLoaderAlt className="animate-spin" />
        </>
      ) : (
        <div className="flex gap-2 justify-center items-center">
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
          <Avatar>
            <AvatarImage
              src={currentUser?.picture}
              alt={currentUser?.username}
            />
            <AvatarFallback className="capitalize">
              {currentUser?.username[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </header>
  );
}

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { BiLoaderAlt } from "react-icons/bi";

export default function Home() {
  const { loading, handleLogout } = useAuth();
  const { currentUser } = useAppSelector((state) => state.appSlice);

  return (
    <main className="flex min-h-screen justify-center items-center bg-gradient-to-t from-pink-400 to-purple-500 flex-col gap-3">
      <h1 className="font-bold text-4xl text-white">Trello Mini Clone</h1>
      {!currentUser && !loading ? (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      ) : loading ? (
        <BiLoaderAlt className="animate-spin" />
      ) : (
        <div className="flex gap-2 justify-center items-center">
          <Avatar>
            <AvatarImage
              src={currentUser?.picture}
              alt={currentUser?.username}
            />
            <AvatarFallback className="capitalize">
              {currentUser?.username[0]}
            </AvatarFallback>
          </Avatar>
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </div>
      )}
    </main>
  );
}

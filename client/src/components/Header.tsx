import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 w-full h-[60px] px-3 bg-white text-black/80 font-bold text-xl flex justify-between items-center shadow-md">
      Trello
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </header>
  );
}

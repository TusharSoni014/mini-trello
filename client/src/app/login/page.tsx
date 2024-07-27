"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { showErrorToast } from "@/components/ui/show-error-toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/signup`,
        values
      );
      toast("Signup Success");
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-t from-violet-300 to-white">
      <div className="__login_container border w-[400px] rounded-2xl p-10 bg-white">
        <h1 className="w-full text-center font-bold text-2xl mb-3">
          Welcome to <span className="text-[#4534AC]">Workflo!</span>
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      {...field}
                      className="bg-black/5 border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      {...field}
                      className="bg-black/5 border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={loading} variant="purple-gradient" type="submit">
              Login
            </Button>
          </form>
        </Form>
        <div className="w-full text-black/60 text-xs mt-3 flex justify-center items-center gap-1.5">
          Don’t have an account? Create a
          <Link className="text-blue-500 hover:underline" href="/signup">
            new account.
          </Link>
        </div>
      </div>
    </div>
  );
}

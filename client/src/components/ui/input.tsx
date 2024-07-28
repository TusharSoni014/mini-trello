import * as React from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [viewPassword, setViewPassword] = React.useState<"password" | "text">(
      "password"
    );
    return type === "password" ? (
      <div
        className={cn(
          "relative w-full border-input rounded-md flex focus-visible:ring-1 overflow-hidden shadow-sm",
          className
        )}
      >
        <input
          type={viewPassword}
          className="flex h-9 border-none bg-transparent px-3 py-1 text-sm  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full pr-12"
          ref={ref}
          {...props}
        />
        <Button
          onClick={() =>
            viewPassword === "password"
              ? setViewPassword("text")
              : setViewPassword("password")
          }
          type="button"
          variant="ghost"
          className="absolute right-0 rounded-none !bg-transparent hover:!bg-transparent text-black shadow-none border-none"
          tabIndex={-1}
        >
          {viewPassword === "password" ? (
            <FaRegEye size={14} />
          ) : (
            <FaRegEyeSlash size={15} />
          )}
        </Button>
      </div>
    ) : (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

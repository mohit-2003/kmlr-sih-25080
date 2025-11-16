// src/components/ui/button.jsx
import { cn } from "@/lib/utils";

export default function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        "w-full py-3 px-4 bg-indigo-700 text-white rounded-xl font-medium shadow-md hover:bg-indigo-800 hover:shadow-lg transition-all",
        className
      )}
    >
      {children}
    </button>
  );
}

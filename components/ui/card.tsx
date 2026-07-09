import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("surface rounded-[28px] p-6 shadow-xl shadow-slate-900/5", className)} {...props} />;
}

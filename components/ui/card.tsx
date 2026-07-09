import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "surface-strong rounded-[var(--radius-md)] p-6 shadow-[var(--shadow-soft)] ring-1 ring-white/30 dark:ring-white/5",
        className
      )}
      {...props}
    />
  );
}

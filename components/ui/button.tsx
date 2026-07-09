import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--foreground)] px-5 text-white shadow-[0_12px_24px_rgba(23,23,23,0.18)] hover:-translate-y-0.5 hover:bg-[color:color-mix(in_srgb,var(--foreground),white_8%)]",
        secondary:
          "surface-strong px-5 text-[var(--foreground)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-soft)]",
        ghost: "px-4 text-[var(--foreground)] hover:bg-black/5 dark:hover:bg-white/5",
        outline:
          "border border-[var(--border-strong)] bg-transparent px-5 text-[var(--foreground)] hover:border-[var(--foreground)]/40 hover:bg-black/5 dark:hover:bg-white/5",
        danger: "bg-[var(--danger)] px-5 text-white hover:-translate-y-0.5"
      },
      size: {
        default: "h-11",
        sm: "h-9 px-3.5 text-[13px]",
        lg: "h-12 px-6 text-[15px]",
        icon: "h-11 w-11 rounded-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

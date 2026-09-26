import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-[#30363d] overflow-hidden",
        className
      )}
      style={{
        backgroundImage: `repeating-linear-gradient(
          315deg,
          #30363d 0px,
          #30363d 1px,
          transparent 1px,
          transparent 14px
        )`,
        backgroundSize: '20px 20px',
      }}
    />
  );
}
import { cn } from "@/lib/utils/style/class";
import React from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800", className)}
      {...props}
    />
  );
}

export { Skeleton };
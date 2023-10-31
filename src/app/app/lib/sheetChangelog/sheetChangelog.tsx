import type { ReactElement } from "react";
import { Button } from "@/lib/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/lib/components/ui/sheet";
import { SheetChangelogStore } from "@/lib/utils/stores/sheetChangelogStore";
import { Version } from "./version";
import { versions } from "@/lib/utils/data/versions";
import { Cross2Icon } from "@radix-ui/react-icons";

export const SheetChangelog = (): ReactElement => {
  const open = SheetChangelogStore((state) => state.isOpen);
  const toggle = SheetChangelogStore((state) => state.toggle);

  return (
    <Sheet open={open}>
      <SheetContent side={"left"} className="overflow-y-scroll no-scrollbar">
        <SheetHeader className="mb-8 relative">
          <SheetClose className="absolute -top-2 right-0" asChild onClick={() => {
            toggle();
          }}>
            <Button variant="outline" size={"icon"}><Cross2Icon className="w-4 h-4" /></Button>
          </SheetClose>
          <SheetTitle>Changelog</SheetTitle>
          <SheetDescription>
            You can see here all the changes made to the site.
          </SheetDescription>
        </SheetHeader>
        <div className="flex gap-4 items-center w-full flex-col-reverse">
          {versions.map((version, idx) => (
            <Version key={idx} title={version.title} logs={version.logs} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
import type { ReactElement } from "react";
import { Button } from "@/lib/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/lib/components/ui/sheet";
import { SheetChangelogStore } from "@/lib/utils/stores/sheetChangelogStore";
import { Version } from "./version";
import { versions } from "@/lib/utils/data/versions";

export const SheetChangelog = (): ReactElement => {
  const open = SheetChangelogStore((state) => state.isOpen);
  const toggle = SheetChangelogStore((state) => state.toggle);

  return (
    <Sheet open={open}>
      <SheetContent side={"left"} className="overflow-y-scroll no-scrollbar">
        <SheetHeader className="mb-8">
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
        <SheetFooter className="mt-8">
          <SheetClose asChild onClick={() => {
            toggle();
          }}>
            <Button variant={"outline"}>Understand</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
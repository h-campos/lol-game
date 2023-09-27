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

export const SheetChangelog = (): ReactElement => {
  const open = SheetChangelogStore((state) => state.isOpen);
  const toggle = SheetChangelogStore((state) => state.toggle);

  return (
    <Sheet open={open}>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Changelog</SheetTitle>
          <SheetDescription>
            You can see here all the changes made to the site.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
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
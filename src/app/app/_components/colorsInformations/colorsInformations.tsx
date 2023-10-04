/* eslint-disable max-len */
import type { ReactElement } from "react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/lib/components/ui/alert-dialog";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/lib/components/ui/button";

export const ColorsInformations = (): ReactElement => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="absolute top-3 right-6">
        <Button variant="outline" size="icon">
          <InfoCircledIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Informations about the colors</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-400" />
                <p>You can play this game</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-400" />
                <p>You already play this game today</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-400" />
                <p>In development</p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Understand</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
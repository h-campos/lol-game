import type { ReactElement } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogReportProposalStore } from "@/lib/utils/stores/dialogReportProposalStore";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const DialogReportProposal = (): ReactElement => {
  const toggle = DialogReportProposalStore((state) => state.toggle);
  const isOpen = DialogReportProposalStore((state) => state.isOpen);

  const handleClick = (): void => {
    toggle();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report / Proposal</DialogTitle>
          <DialogDescription>
            Send us a report for a bug or proposal for a new feature you would like to see in the app.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <Label htmlFor="message">Your message</Label>
          <Textarea id="message" className="mt-2" placeholder="Type your message here..." />
        </div>
        <DialogFooter>
          <Button onClick={handleClick} type="submit">Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
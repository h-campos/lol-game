import { useState, type ReactElement } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogReportProposalStore } from "@/lib/utils/stores/dialogReportProposalStore";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/lib/utils/hooks/use-toasts";

export const DialogReportProposal = (): ReactElement => {
  const toggle = DialogReportProposalStore((state) => state.toggle);
  const isOpen = DialogReportProposalStore((state) => state.isOpen);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { toast } = useToast();

  const handleClick = async(): Promise<void> => {
    setIsLoading(true);
    await fetch("/api/sendReportProposal", {
      method: "POST",
      body: JSON.stringify({ message: message }),
      headers: { "Content-Type": "application/json",  "Access-Control-Allow-Origin": "*" }
    });
    setIsLoading(false);
    toggle();
    toast({
      title: "Message sent !",
      description: "Thank you for your feedback.",
      variant: "default"
    });
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
          <Textarea id="message" className="mt-2" placeholder="Type your message here..." onChange={(e) => setMessage(e.target.value)} />
        </div>
        <DialogFooter>
          <Button variant={"secondary"} onClick={() => toggle()}>Cancel</Button>
          {isLoading && (
            <Button disabled>Sending...</Button>
          )}
          {!isLoading && (
            <Button onClick={() => void handleClick()}>Send</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
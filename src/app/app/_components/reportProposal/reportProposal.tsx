import type { ReactElement } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import { DialogReportProposalStore } from "@/lib/utils/stores/dialogReportProposalStore";

export const ReportProposal = (): ReactElement => {
  const toggle = DialogReportProposalStore((state) => state.toggle);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report / Proposal</CardTitle>
        <CardDescription>
          Press the button bellow to send us a report of a bug or a proposal for a new feature or a new game on the app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={toggle}>Report / Proposal</Button>
      </CardContent>
    </Card>
  );
};
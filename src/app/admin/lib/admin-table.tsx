import type { Component } from "@/lib/utils/component";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/ui/table";
import { Badge } from "@/lib/components/ui/badge";
import { Button } from "@/lib/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/lib/components/ui/dropdown-menu";
import { ToggleLeftIcon, Trash2Icon, PencilIcon } from "lucide-react";
import type { Proposal } from "@prisma/client";

type Props = {
  data: Proposal[];
  deleteReport: (id: string) => Promise<void>;
}

const AdminTable: Component<Props> = ({ data, deleteReport }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Pseudo</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((report: Proposal, idx: number) => (
          <TableRow key={idx}>
            <TableCell className="truncate max-w-[200px]">{report.id}</TableCell>
            <TableCell>{report.username}</TableCell>
            <TableCell>{report.mail}</TableCell>
            <TableCell>{report.message}</TableCell>
            <TableCell><Badge variant={
              report.status === "To be reviewed" ? "destructive"
                : report.status === "In review" ? "yellow"
                  : report.status === "Finish" ? "success" : "default"
            }>{report.status}</Badge></TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant={"outline"} size={"icon"}>...</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <ToggleLeftIcon className="mr-2 w-5 h-5" />Change status
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => void deleteReport(report.id)}>
                      <Trash2Icon className="mr-2 w-5 h-5" />Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <PencilIcon className="mr-2 w-5 h-5" />Edit
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminTable;
"use client";

import type { ReactElement } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/ui/table";
import useSwr from "swr";
import { fetcher } from "@/lib/utils/database/fetcher";
import { Skeleton } from "@/lib/components/ui/skeleton";
import type { Proposal } from "@prisma/client";
import { Badge } from "@/lib/components/ui/badge";
import { Button } from "@/lib/components/ui/button";

const Admin = (): ReactElement => {
  const { data, isLoading } = useSwr<Proposal[]>("/api/sendReportProposal", fetcher);

  return (
    <>
      <div className="hidden flex-col md:flex w-3/4 pt-6">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">ADMIN DASHBOARD</h2>
          </div>
          <Tabs defaultValue="report-proposal" className="space-y-4">
            <TabsList>
              <TabsTrigger value="report-proposal">Report / Proposal</TabsTrigger>
              <TabsTrigger value="user-update">User Update</TabsTrigger>
              <TabsTrigger value="new-game">New Game</TabsTrigger>
            </TabsList>
            <TabsContent value="report-proposal" className="space-y-4">
              <div className="rounded-md border">
                {isLoading && (<Skeleton className="rounded-md w-full h-12" />)}
                {data && !isLoading && (
                  <Table>
                    <TableHeader>
                      <TableRow>
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
                          <TableCell>{report.username}</TableCell>
                          <TableCell>{report.mail}</TableCell>
                          <TableCell>{report.message}</TableCell>
                          <TableCell><Badge variant={
                            report.status === "To be reviewed" ? "destructive"
                              : report.status === "In review" ? "yellow"
                                : report.status === "Finish" ? "success" : "default"
                          }>{report.status}</Badge></TableCell>
                          <TableCell><Button variant={"outline"} size={"icon"}>...</Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Admin;
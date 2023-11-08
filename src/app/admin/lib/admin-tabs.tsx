"use client";

import type { Proposal } from "@prisma/client";
import AdminTable from "./admin-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/ui/tabs";
import type { Component } from "@/lib/utils/component";

type Props = {
  data: Proposal[];
  deleteReport: (id: string) => Promise<void>;
}

const AdminTabs: Component<Props> = ({ data, deleteReport }) => {
  return (
    <Tabs defaultValue="report-proposal" className="space-y-4">
      <TabsList>
        <TabsTrigger value="report-proposal">Report / Proposal</TabsTrigger>
        <TabsTrigger value="user-update" disabled>User Update</TabsTrigger>
      </TabsList>
      <TabsContent value="report-proposal" className="space-y-4">
        <div className="rounded-md border">
          <AdminTable data={data} deleteReport={deleteReport} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
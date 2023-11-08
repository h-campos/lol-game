import type { ReactElement } from "react";
import { prisma } from "@/lib/utils/database";
import AdminTabs from "./lib/admin-tabs";

const Admin = async(): Promise<ReactElement> => {
  const data = await prisma.proposal.findMany();

  const deleteReport = async(id: string): Promise<void> => {
    "use server";
    await prisma.proposal.delete({
      where: {
        id: id
      }
    });
  };

  return (
    <>
      <div className="hidden flex-col md:flex w-3/4 pt-6">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">ADMIN DASHBOARD</h2>
          </div>
          <AdminTabs data={data} deleteReport={deleteReport} />
        </div>
      </div>
    </>
  );
};

export default Admin;
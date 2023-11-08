"use client";

import type { Component } from "@/lib/utils/component";
import { useEffect, type PropsWithChildren } from "react";
import { useUserContext } from "@/lib/utils/contexts/user-provider";
import { redirect } from "next/navigation";
import { Navbar } from "@/lib/components/navbar";

const AdminLayout: Component<PropsWithChildren> = ({ children }) => {
  const { user } = useUserContext();

  useEffect(() => {
    if (user !== "loading" && user !== null && user.id !== process.env.NEXT_PUBLIC_ADMIN_ID) {
      redirect("/app");
    } else {
      console.log("you are the admin");
    }
  }, [user]);

  return (
    <>
      <Navbar isAdmin={true} />
      { children }
    </>
  );
};

export default AdminLayout;
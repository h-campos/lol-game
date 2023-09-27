"use client";

import type { Component } from "@/lib/utils/component";
import { useEffect, type PropsWithChildren } from "react";
import { useUserContext } from "@/lib/utils/contexts/user-provider";
import { redirect } from "next/navigation";
import { SheetChangelog } from "./_components/sheetChangelog/sheetChangelog";

const AppLayout: Component<PropsWithChildren> = ({ children }) => {
  const { user } = useUserContext();

  useEffect(() => {
    if (user === null) {
      redirect("/");
    }
  }, [user]);

  return (
    <>
      <SheetChangelog />
      { children }
    </>
  );
};

export default AppLayout;
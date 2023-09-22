"use client";

import type { Component } from "@/lib/utils/component";
import { useEffect, type PropsWithChildren } from "react";
import { useUserContext } from "@/lib/utils/contexts/user-provider";
import { redirect } from "next/navigation";

const AppLayout: Component<PropsWithChildren> = ({ children }) => {
  const { user } = useUserContext();

  useEffect(() => {
    if (user === null) {
      redirect("/");
    }
  }, [user]);

  return (
    <>
      { children }
    </>
  );
};

export default AppLayout;
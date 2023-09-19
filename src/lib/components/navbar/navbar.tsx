import type { ReactElement } from "react";
import { NavbarMenu } from "@/lib/components/navbar-menu/navbarMenu";

export const Navbar = (): ReactElement => {
  return (
    <div className="text-white bg-red-500 w-full mb-6 flex justify-between items-center">
      <span style={{ filter: "drop-shadow(0px 5px 12px #ffffff)" }} className="text-2xl font-bold text-titleHighlight">LOLGAMES</span>
      <NavbarMenu />
    </div>
  );
};
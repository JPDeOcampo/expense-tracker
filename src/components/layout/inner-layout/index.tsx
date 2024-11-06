"use client";
import { FC, ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/layout/header";
import MenuDrawer from "@/components/layout/menu-drawer";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

const InnerLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  return (
    <NextUIProvider className="brand">
      {pathname !== "/" && (
        <>
          <Header /> <MenuDrawer />
        </>
      )}
      <main className="h-auto min-h-screen bg-secondary-50">{children}</main>
      <Toaster />
    </NextUIProvider>
  );
};
export default InnerLayout;

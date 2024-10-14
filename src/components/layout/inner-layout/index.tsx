"use client";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/layout/header";
import MenuDrawer from "@/components/layout/menu-drawer";
import { usePathname } from "next/navigation";
import ValidateContainer from "@/components/shared/components/validate-container";
const InnerLayout = ({ children }: any) => {
  const pathname = usePathname();
  return (
    <ValidateContainer>
      <NextUIProvider className="brand">
        {pathname !== "/" && (
          <>
            <Header /> <MenuDrawer />
          </>
        )}
        <main className="h-auto min-h-screen bg-secondary-50">{children}</main>
      </NextUIProvider>
    </ValidateContainer>
  );
};
export default InnerLayout;

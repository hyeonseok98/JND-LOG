import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { PropsWithChildren } from "react";

export default function mainLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative">
      <Header />
      <div className="flex pt-[64px] h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-600">{children}</main>
      </div>
    </div>
  );
}

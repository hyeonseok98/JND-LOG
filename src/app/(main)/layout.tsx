import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <Header />
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

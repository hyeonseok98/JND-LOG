import { PropsWithChildren } from "react";

export default function SectionLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col justify-start items-center py-4" style={{ height: "calc(100vh - 64px)" }}>
      {children}
    </div>
  );
}

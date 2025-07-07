import { PropsWithChildren } from "react";

export default function SectionLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex-col justify-start items-start" style={{ height: "calc(100vh - 60px)" }}>
      {children}
    </div>
  );
}

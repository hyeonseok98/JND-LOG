import { ReactQueryProvider, SidebarProvider } from "@/contexts";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const pretendard = localFont({
  src: "../styles/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const hansansBold = localFont({
  src: "../styles/fonts/SpoqaHanSansBold.woff2",
  display: "swap",
  weight: "700",
  variable: "--font-spoqahansans-bold",
});

export const metadata: Metadata = {
  title: "자낳대 LOG",
  description: "자낳대를 더 깊이 즐길 수 있는 기록 모음 팬사이트입니다.",
  icons: { icon: "/logo/wave.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ko">
      <body className={`${pretendard.className} ${hansansBold.variable} antialiased`}>
        <ReactQueryProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ReactQueryProvider>

        {/* ---------- Google tag (gtag.js) ---------- */}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

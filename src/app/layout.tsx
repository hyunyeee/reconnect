import type { Metadata } from "next";
import { pretendard } from "@/styles/font";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/app/providers/QueryProvider";
import OverlayRenderer from "@/components/overlay/OverlayRenderer";

export const metadata: Metadata = {
  title: "Re:connect",
  description: "재회",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full min-h-screen`}>
      <body
        className={`${pretendard.className} h-full min-h-screen w-full overflow-auto text-black`}
      >
        <QueryProvider>
          <main className="flex min-h-screen items-center justify-center">
            <div id="portal" />
            <OverlayRenderer />

            <div className="w-full max-w-md">{children}</div>

            <Toaster position="top-center" richColors closeButton />
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}

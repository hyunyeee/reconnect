import type { Metadata } from "next";
import { pretendard } from "@/styles/font";
import "./globals.css";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import QueryProvider from "@/app/providers/QueryProvider";
import { Providers } from "@/app/Providers";
import OverlayRenderer from "@/components/overlay/OverlayRenderer";

export const metadata: Metadata = {
  title: "Re:connect",
  description: "재회",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(cookieStore.get("token"));

  return (
    <html lang="ko" className={`${pretendard.variable} h-full min-h-screen`}>
      <body
        className={`${pretendard.className} h-full min-h-screen w-full overflow-auto text-black`}
      >
        <Providers isLoggedIn={isLoggedIn}>
          <QueryProvider>
            <main className="flex min-h-screen items-center justify-center">
              <div id="portal" />
              <OverlayRenderer />

              <div className="w-full max-w-md">{children}</div>

              <Toaster position="top-center" richColors closeButton />
            </main>
          </QueryProvider>
        </Providers>
      </body>
    </html>
  );
}

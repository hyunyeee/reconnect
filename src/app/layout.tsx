import type { Metadata } from "next";
import Script from "next/script";
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
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(cookieStore.get("token"));

  return (
    <html lang="ko" className={`${pretendard.variable} h-full min-h-screen`}>
      <body
        className={`${pretendard.className} h-full min-h-screen w-full overflow-auto text-black`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FD8Q76DJ1N"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FD8Q76DJ1N');
          `}
        </Script>

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

import type { Metadata } from "next";
import { cookies } from "next/headers";
import { pretendard } from "@/styles/font";
import "./globals.css";

import { Toaster } from "sonner";
import QueryProvider from "@/app/providers/QueryProvider";
import { Providers } from "@/app/Providers";
import OverlayRenderer from "@/components/overlay/OverlayRenderer";
import GoogleAnalyticsPageView from "@/components/analytics/GoogleAnalyticsPageView";
import { KakaoAdFit } from "@/components/KaKaoAdFit";
import { isTossMiniApp } from "@/lib/isTossMiniApp";

export const metadata: Metadata = {
  title: "Re:connect",
  description: "재회를 원하는 사람들을 위한 서비스. 다시 만나고 싶은 사람이 있나요?",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(cookieStore.get("token"));

  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        {!isTossMiniApp() && (
          <>
            {/* Google AdSense */}
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7293517480091822"
              crossOrigin="anonymous"
            />

            {/* Google Analytics */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-FD8Q76DJ1N" />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-FD8Q76DJ1N');
                `,
              }}
            />
          </>
        )}
      </head>

      <body className={`${pretendard.className} min-h-screen w-full bg-white text-black`}>
        <GoogleAnalyticsPageView />

        <Providers isLoggedIn={isLoggedIn}>
          <QueryProvider>
            <div id="portal" />
            <OverlayRenderer />

            {/* 메인 컨텐츠 */}
            <main className="mx-auto w-full max-w-md px-4 pt-6">{children}</main>

            {!isTossMiniApp() && (
              <footer className="mt-16 border-t border-gray-100 py-8">
                <div className="mx-auto flex max-w-md flex-col items-center gap-6 px-4">
                  <KakaoAdFit unit="DAN-aLlyYJ68qqHuPvdY" width={300} height={250} />
                  <KakaoAdFit unit="DAN-ZOGkyfi9vPA93ivl" width={300} height={250} />
                  <KakaoAdFit unit="DAN-wAz4OD2dxCo8DFqy" width={320} height={100} />
                </div>
              </footer>
            )}

            <Toaster position="top-center" richColors closeButton />
          </QueryProvider>
        </Providers>
      </body>
    </html>
  );
}

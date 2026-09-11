import "./globals.css";
import "./animations.css";
import "./scroll-life.css";
import type { Metadata } from "next";
import Script from "next/script";

const siteUrlRaw = (process.env.NEXT_PUBLIC_SITE_URL || "https://webrisehub.com").trim();
const siteUrl = siteUrlRaw.startsWith("http://") || siteUrlRaw.startsWith("https://")
  ? siteUrlRaw
  : `https://${siteUrlRaw}`;
const googleAnalyticsId = "G-3N44VQVMDX";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "WebRiseHub — Where Players Engage. Brands Rise.",
  description:
    "Interactive games designed to attract attention, keep players coming back, and place brands inside experiences people enjoy."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").trim();
  const basePath = rawBasePath
    ? `/${rawBasePath}`.replace(/\/{2,}/g, "/").replace(/\/$/, "")
    : "";

  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8579719479106704"
          crossOrigin="anonymous"
        />
      </head>
      <body id="top">
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
        <Script src={`${basePath}/animations.js`} strategy="afterInteractive" />
      </body>
    </html>
  );
}

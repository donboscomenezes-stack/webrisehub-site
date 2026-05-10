import "./globals.css";
import "./animations.css";
import type { Metadata } from "next";
import Script from "next/script";

const siteUrlRaw = (process.env.NEXT_PUBLIC_SITE_URL || "https://webrisehub.com").trim();
const siteUrl = siteUrlRaw.startsWith("http://") || siteUrlRaw.startsWith("https://")
  ? siteUrlRaw
  : `https://${siteUrlRaw}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "WebRiseHub — Websites That Help Businesses Grow Faster",
  description:
    "Modern websites, landing pages, content platforms, and QA-backed digital solutions that help businesses build trust and grow online."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").trim();
  const basePath = rawBasePath
    ? `/${rawBasePath}`.replace(/\/{2,}/g, "/").replace(/\/$/, "")
    : "";

  return (
    <html lang="en">
      <body>
        {children}
        <Script src={`${basePath}/animations.js`} strategy="afterInteractive" />
      </body>
    </html>
  );
}
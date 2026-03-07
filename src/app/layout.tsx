import "./globals.css";
import "./animations.css";
import type { Metadata } from "next";

const siteUrlRaw = (process.env.NEXT_PUBLIC_SITE_URL || "https://webrisehub.com").trim();
const siteUrl = siteUrlRaw.startsWith("http://") || siteUrlRaw.startsWith("https://")
  ? siteUrlRaw
  : `https://${siteUrlRaw}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "WebRiseHub — Websites That Turn Visitors Into Leads",
  description: "Premium websites, landing pages, and marketing systems for service businesses in India and the US."
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
        <script src={`${basePath}/animations.js`} defer />
      </body>
    </html>
  );
}
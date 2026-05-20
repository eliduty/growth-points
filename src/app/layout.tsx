import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "家庭积分任务",
  description: "家庭任务管理和积分兑换系统，让孩子通过完成任务获得积分，兑换心仪的礼物",
  keywords: ["家庭", "积分", "任务", "孩子", "奖励", "教育"],
  authors: [{ name: "家庭积分系统" }],
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf5ff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a0a2e" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "积分任务",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "家庭积分任务",
    description: "家庭任务管理和积分兑换系统",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="积分任务" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="积分任务" />
        <meta name="msapplication-TileColor" content="#9333ea" />
        <meta name="theme-color" content="#9333ea" />
      </head>
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

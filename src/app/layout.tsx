import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { UserProvider } from "@/providers/user-provider";
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "家庭积分兑换系统",
  description: "通过积分机制激励孩子完成日常任务",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <QueryProvider>
          <UserProvider>
            {children}
            <Toaster />
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
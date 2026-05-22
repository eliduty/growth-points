"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    { name: "任务", href: "/child", icon: "📋" },
    { name: "礼物", href: "/child/gifts", icon: "🎁" },
    { name: "我的", href: "/child/profile", icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main>{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center py-2 px-4 ${
                pathname === tab.href ? "text-orange-500" : "text-gray-500"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-xs">{tab.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

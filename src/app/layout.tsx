import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XiaoTNT — 肖宜欣的个人主页",
  description: "Welcome to XiaoTNT's personal homepage — a dark-tech portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body>{children}</body>
    </html>
  );
}

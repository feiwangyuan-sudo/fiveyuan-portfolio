import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "fiveyuan — Portfolio",
  description: "fiveyuan 的个人作品集，展示 AI 应用与全栈产品。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

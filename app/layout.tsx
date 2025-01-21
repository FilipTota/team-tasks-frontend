import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "TeamTasks",
  description: "Task Management and Collaboration Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

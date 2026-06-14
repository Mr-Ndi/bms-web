import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Boardroom Management System",
  description: "Frontend for room availability, bookings, invitations, and booking history.",
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

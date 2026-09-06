import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Utopia — Break the Code",
  description: "Think. Debug. Crack. Win.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "@/styles/fonts.css";
import "@/styles/globals.css";
import { GridLines } from "@/components/GridLines/GridLines";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GridLines />
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}

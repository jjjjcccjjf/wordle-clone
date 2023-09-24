import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Providers } from "./redux/provider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wordle clone by endan",
  description: "A 5-letter game to put your wits to the test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      {/* <body className={inter.className}> */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

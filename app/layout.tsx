import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./redux/provider";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

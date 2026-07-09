import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";

import { Providers } from "@/components/providers";
import "@/app/globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Inkspire",
    template: "%s | Inkspire"
  },
  description: "A premium, scalable publishing platform for technical teams and modern creators."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

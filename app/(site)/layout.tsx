import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "../components/shared/NavBar";
import Footer from "../components/shared/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Cần Thơ Vivu",
  description: "Travel blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} overflow-x-hidden bg-[#fffcf2]`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

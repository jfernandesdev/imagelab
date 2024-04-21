import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "ImageLab by jfernandesdev",
  description: "Facilitando a edição de imagens por meio da IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      localization={ptBR} 
      appearance={{
        variables: {
          colorPrimary: '#9747FF'
        }
      }}>
      <html lang="pt-br">
        <body className={cn("font-poppins antialiased", poppins.variable)}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

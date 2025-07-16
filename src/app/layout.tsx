import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pyro Shop - Premium Firecrackers & Pyrotechnics",
  description:
    "Your trusted destination for premium firecrackers and pyrotechnics. Bringing joy and celebration to every occasion.",
  keywords:
    "firecrackers, pyrotechnics, fireworks, celebration, festival, diwali, new year",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#FFFFFF",
                  color: "#0A0A0A",
                  border: "1px solid #E5E5E5",
                  borderRadius: "12px",
                  fontSize: "14px",
                },
                success: {
                  iconTheme: {
                    primary: "#FF4444",
                    secondary: "#FFFFFF",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#EF4444",
                    secondary: "#FFFFFF",
                  },
                },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

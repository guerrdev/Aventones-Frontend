import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "./components/navBar/navBar";
import { AuthProvider } from "./AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aventones",
  description: "Check for a ride or offer one, Aventones is the best way to share your ride",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className='dark'>
      <body>
        <Providers>
          <AuthProvider>
            <NavBar />
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
import { Inter } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import Taskbar from './components/Taskbar';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Portfolio OS",
  description: "A Windows-like portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} font-sans antialiased h-full`}>
        <div className="h-screen flex flex-col overflow-hidden">
          <AuthProvider>
            <div className="flex-1 relative">
              {children}
            </div>
          </AuthProvider>
        </div>
        {/* <Taskbar /> */}
      </body>
    </html>
  );
}

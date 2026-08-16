import type { Metadata, Viewport } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Bright Smile",
  description: "Bright Smile — стоматолошка клиника — mobile web app",
  appleWebApp: {
    // Drives iOS "Add to Home Screen": runs full-screen without Safari
    // chrome once installed. Real apple-touch-icon still needs an actual
    // icon file under public/ — see app/manifest.ts's TODO.
    capable: true,
    statusBarStyle: "default",
    title: "Bright Smile",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // viewport-fit=cover + the safe-top/safe-bottom utilities in globals.css
  // are what let content sit correctly around the iPhone notch / home indicator.
  viewportFit: "cover",
  themeColor: "#1a46d1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* pb-16 clears the fixed bottom tab bar (incl. its elevated center button) */}
      <body>
        <TopBar />
        <main className="pb-16">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}

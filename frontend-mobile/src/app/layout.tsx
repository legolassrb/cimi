import type { Metadata, Viewport } from "next";
import { Caprasimo, Figtree } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { StickyBarProvider } from "@/lib/sticky-bar";
import { TopHeader } from "@/components/farmadent/nav";
import StickyCallBar from "@/components/farmadent/StickyCallBar";
import ArchSwitcher from "@/components/farmadent/ArchSwitcher";
import sr from "@/content/sr";

const caprasimo = Caprasimo({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caprasimo",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-figtree",
});

// Metadata is server-rendered once, so it uses the Serbian dictionary
// directly (the default language) rather than the client-side language
// context — see lib/i18n.tsx for why the language switch itself is
// client-only.
export const metadata: Metadata = {
  title: sr.meta.title,
  description: sr.meta.description,
  appleWebApp: {
    // Drives iOS "Add to Home Screen" — real apple-touch-icon still needs
    // an actual icon file under public/, see app/manifest.ts's TODO.
    capable: true,
    statusBarStyle: "default",
    title: sr.meta.title,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // viewport-fit=cover + the safe-top/safe-bottom utilities in globals.css
  // are what let content sit correctly around the iPhone notch / home
  // indicator.
  viewportFit: "cover",
  themeColor: "#39609e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className={`${caprasimo.variable} ${figtree.variable}`}>
      <body>
        <LanguageProvider>
          <StickyBarProvider>
            {/* Centred on desktop, full-width on mobile — see mvp brief §1
                "Mobile-first". StickyCallBar and ArchSwitcher stay outside
                this wrapper: the bar is a full-viewport fixed element with
                its own inner max-width, and the switcher is a small
                floating widget. */}
            <div className="mx-auto w-full max-w-[520px]">
              <TopHeader />
              {/* pb-28 clears the fixed sticky call bar. */}
              <main className="pb-28">{children}</main>
            </div>
            <StickyCallBar />
            <ArchSwitcher />
          </StickyBarProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

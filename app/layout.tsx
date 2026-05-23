import type { Metadata, Viewport } from "next";
import { Inter, Sawarabi_Mincho } from "next/font/google";
import { Toaster } from "sonner";
import { personal } from "@/data/personal";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sawarabi = Sawarabi_Mincho({
  variable: "--font-sawarabi",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const siteUrl = "https://portfolio-vob.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personal.name} — ${personal.role}`,
    template: `%s · ${personal.name}`,
  },
  description: personal.tagline,
  keywords: [
    "Vansh Oberoi",
    "Software Developer",
    "Next.js",
    "Sitecore",
    "AI Developer",
    "Machine Learning",
    "Python",
    "Django",
    "GATE 2026",
    "Portfolio",
  ],
  authors: [{ name: personal.name, url: personal.links.linkedin }],
  creator: personal.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${personal.name} — ${personal.role}`,
    description: personal.tagline,
    siteName: `${personal.name} · Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — ${personal.role}`,
    description: personal.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b3d2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sawarabi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-sunset selection:text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: personal.name,
              jobTitle: personal.role,
              email: `mailto:${personal.email}`,
              telephone: personal.phone,
              url: siteUrl,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kapurthala",
                addressRegion: "Punjab",
                addressCountry: "IN",
              },
              sameAs: [personal.links.github, personal.links.linkedin],
            }),
          }}
        />
        {children}
        <Toaster
          position="bottom-right"
          theme="dark"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "rgba(11, 61, 46, 0.92)",
              color: "var(--parchment)",
              border: "1px solid var(--forest-500)",
              backdropFilter: "blur(8px)",
            },
          }}
        />
      </body>
    </html>
  );
}

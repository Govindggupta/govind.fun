import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const title = "Govind Gupta — Full Stack Developer";
const description =
  "Govind Gupta is a full-stack developer from Surat, India — building real-time systems, AI-powered products and developer tooling with TypeScript, Next.js and Node.js. Open to work.";

export const metadata: Metadata = {
  metadataBase: new URL("https://govind.fun"),
  title,
  description,
  keywords: [
    "Govind Gupta",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "React",
    "Surat",
    "India",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://govind.fun",
    siteName: "govind.fun",
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
    creator: "@3g_g0vind",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Govind Gupta",
  url: "https://govind.fun",
  email: "mailto:contact@govindgupta.me",
  jobTitle: "Full Stack Developer",
  address: { "@type": "PostalAddress", addressLocality: "Surat", addressCountry: "IN" },
  sameAs: [
    "https://github.com/Govindggupta",
    "https://linkedin.com/in/govindggupta",
    "https://x.com/3g_g0vind",
    "https://govindgupta.me",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        {/* Runs before first paint: gate the scroll-effect styles on JS + motion
            preference so content is never hidden without JavaScript. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('fx-reduced')}else{d.classList.add('fx-ready')}}catch(e){}})();",
          }}
        />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

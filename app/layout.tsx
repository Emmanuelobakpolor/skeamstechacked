import type { Metadata, Viewport } from 'next';
import './globals.css';
import WhatsAppSupport from '@/components/WhatsAppSupport';
import GlobalBackground from '@/components/GlobalBackground';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'SKEAM Technologies - Gate Automation, CCTV, Solar & Inverters in Nigeria',
  description: 'Trusted provider of gate automation, CCTV surveillance, solar energy solutions, and inverter systems in Nigeria. Professional installation and maintenance services for residential and commercial properties.',
  keywords: 'gate automation, CCTV, solar panels, inverters, security systems, Nigeria, Lagos, SKEAM Technologies',
  robots: 'index, follow',
  icons: {
    icon: '/images/SKEAM SYMBOL .png',
    shortcut: '/images/SKEAM SYMBOL .png',
    apple: '/images/SKEAM SYMBOL .png',
  },
  openGraph: {
    title: 'SKEAM Technologies - Security & Power Solutions',
    description: 'Professional gate automation, CCTV, solar energy, and inverter solutions across Nigeria.',
    type: 'website',
    locale: 'en_NG',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="relative bg-slate-950 overflow-x-hidden">
        <GlobalBackground />
        <div className="relative z-0">
          {children}
        </div>
        <WhatsAppSupport />
      </body>
    </html>
  );
}

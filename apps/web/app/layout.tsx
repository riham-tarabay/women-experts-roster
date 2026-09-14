import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Women Experts Roster',
  description: 'Bilingual searchable directory portfolio application',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

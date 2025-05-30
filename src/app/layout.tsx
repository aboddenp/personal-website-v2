import type { Metadata } from 'next';
import { Outfit, Roboto_Flex } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Sections/Footer';

const outfit = Outfit({
  variable: '--font-outfit',
});

const robotoFlex = Roboto_Flex({
  variable: '--font-roboto-flex',
});

export const metadata: Metadata = {
  title: 'Aster Bodden | Web Developer',
  description:
    'I’m Aster Bodden — a front-end developer passionate about clean code, smooth interactions, and great design. Let’s build something amazing.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${robotoFlex.variable}`}>{children}</body>
    </html>
  );
}

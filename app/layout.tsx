import type { ReactNode } from 'react';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
  title: 'File Explorer',
  description: 'A modern file management system',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="h-full bg-gray-50">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
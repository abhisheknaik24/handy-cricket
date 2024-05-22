import { ModalProvider } from '@/components/providers/modal-provider';
import QueryProvider from '@/components/providers/query-provider';
import { ToasterProvider } from '@/components/providers/toaster-provider';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Handy Cricket',
  description: 'Handy Cricket',
  keywords: ['Handy Cricket', 'Abhishek Naik'],
  authors: [{ name: 'Abhishek Naik' }],
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang='en'>
      <body
        className={cn(
          'relative h-full w-full max-w-screen-2xl mx-auto bg-neutral-900 overflow-x-hidden overflow-y-auto scrollbar-hide',
          font.className
        )}
      >
        <QueryProvider>
          {children}
          <ModalProvider />
          <ToasterProvider />
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;

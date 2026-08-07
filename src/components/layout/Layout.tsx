import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <Header />
      <main className="container mx-auto p-4 flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

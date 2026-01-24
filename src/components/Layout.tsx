import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { Nav } from "./Nav";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-oow-navy-700">
      <Header />
      <Nav />
      <main className="flex-1 p-4 md:p-6">{children}</main>
      <Footer />
    </div>
  );
};

import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Nav } from "./Nav";
import { AISidePanel } from "./AISidePanel";
import { LoginModal } from "./LoginModal";

export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-oow-navy-700">
      <div className="sticky top-0 z-40">
        <Header />
        <Nav />
      </div>
      <main className="mx-auto w-full max-w-7xl flex-1 p-4 md:p-6">
        <Outlet />
      </main>
      <LoginModal />
      <AISidePanel />
      <Footer />
    </div>
  );
};

import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Nav } from "./Nav";

export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-oow-navy-700">
      <Header />
      <Nav />
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

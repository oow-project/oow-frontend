import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HeroDetail } from "./pages/HeroDetail";
import { Heroes } from "./pages/Heroes";
import { HeroesStats } from "./pages/HeroesStats";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/stats", element: <HeroesStats /> },
      { path: "/heroes", element: <Heroes /> },
      { path: "/heroes/:heroKey", element: <HeroDetail /> },
    ],
  },
]);

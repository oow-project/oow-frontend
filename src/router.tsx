import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout/Layout";
import { HeroDetail } from "./pages/HeroDetail";
import { Heroes } from "./pages/Heroes";
import { HeroesStats } from "./pages/HeroesStats";
import { ROUTES } from "./constants/routes";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: ROUTES.home, element: <HeroesStats /> },
      { path: ROUTES.heroes, element: <Heroes /> },
      { path: ROUTES.heroDetail, element: <HeroDetail /> },
    ],
  },
]);

import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HeroDetail } from "./pages/HeroDetail";
import { Heroes } from "./pages/Heroes";
import { HeroesStats } from "./pages/HeroesStats";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HeroesStats /> },
      { path: "/heroes", element: <Heroes /> },
      { path: "/heroes/:heroKey", element: <HeroDetail /> },
    ],
  },
]);

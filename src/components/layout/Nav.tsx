import { NavLink } from "react-router";
import { ROUTES } from "../../constants/routes";
import { NAV_LABELS } from "../../constants/messages";

export const Nav = () => {
  return (
    <nav className="flex gap-4 md:gap-6 px-4 md:px-6 py-3 md:py-4 bg-oow-navy-800">
      <NavLink
        to={ROUTES.home}
        className={({ isActive }) =>
          `text-sm ${isActive ? "text-oow-white border-b-3 border-oow-orange pb-1" : "text-oow-gray"}`
        }
      >
        {NAV_LABELS.HERO_STATS}
      </NavLink>
      <NavLink
        to={ROUTES.heroes}
        className={({ isActive }) =>
          `text-sm ${isActive ? "text-oow-white border-b-3 border-oow-orange pb-1" : "text-oow-gray"}`
        }
      >
        {NAV_LABELS.HEROES}
      </NavLink>
    </nav>
  );
};

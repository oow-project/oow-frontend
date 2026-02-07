import { NavLink } from "react-router";

export const Nav = () => {
  return (
    <nav className="flex gap-4 md:gap-6 px-4 md:px-6 py-3 md:py-4 bg-oow-navy-800">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-sm ${isActive ? "text-oow-white border-b-3 border-oow-orange pb-1" : "text-oow-gray"}`
        }
      >
        영웅 통계
      </NavLink>
      <NavLink
        to="/heroes"
        className={({ isActive }) =>
          `text-sm ${isActive ? "text-oow-white border-b-3 border-oow-orange pb-1" : "text-oow-gray"}`
        }
      >
        영웅 정보
      </NavLink>
    </nav>
  );
};

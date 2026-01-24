import { Link } from "react-router";

export const Nav = () => {
  return (
    <nav className="flex gap-4 md:gap-6 px-4 md:px-6 py-3 md:py-4 bg-oow-navy-800">
      <Link to="/stats" className="text-sm text-oow-gray">
        영웅 통계
      </Link>
      <Link to="/heroes" className="text-sm text-oow-gray">
        영웅 정보
      </Link>
    </nav>
  );
};

import { Link } from "react-router";
import { ROUTES } from "../constants/routes";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <h1 className="text-7xl font-black text-oow-orange">404</h1>
      <p className="mt-4 text-xl text-oow-white">페이지를 찾을 수 없습니다</p>
      <Link
        to={ROUTES.home}
        className="mt-8 rounded-lg bg-oow-orange px-6 py-3 font-bold text-oow-navy-900 transition-colors hover:bg-oow-orange/80"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

import { useEffect } from "react";
import { useLocation } from "react-router";
import { pageview } from "../utils/analytics";

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    pageview(location.pathname + location.search);
  }, [location]);
};

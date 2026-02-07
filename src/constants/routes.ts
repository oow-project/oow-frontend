export const ROUTES = {
  home: "/",
  heroes: "/heroes",
  heroDetail: "/heroes/:heroKey",
  heroDetailPath: (heroKey: string) => `/heroes/${heroKey}`,
} as const;

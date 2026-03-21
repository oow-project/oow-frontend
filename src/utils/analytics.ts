const GA_ID = "G-ZW29Q6S164";

export const pageview = (url: string) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("config", GA_ID, { page_path: url });
};

export const event = (action: string, params?: Record<string, unknown>) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
};

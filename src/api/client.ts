import ky from "ky";
import { supabase } from "../lib/supabase";

const attachAuthorizationHeader = async (request: Request): Promise<void> => {
  const { data } = await supabase.auth.getSession();
  const accessToken = data.session?.access_token;

  if (accessToken) {
    request.headers.set("Authorization", `Bearer ${accessToken}`);
  }
};

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  hooks: {
    beforeRequest: [attachAuthorizationHeader],
  },
});

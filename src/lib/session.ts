import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const sessionOptions = {
  cookieName: "growth_points_session",
  password: process.env.SESSION_SECRET || "default_secret_for_development_only",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

interface SessionUser {
  id: string;
  familyId: string;
  role: string;
}

interface SessionData {
  user?: SessionUser;
}

export async function getSession() {
  const cookieStore = cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

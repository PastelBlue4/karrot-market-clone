import { withIronSessionApiRoute } from "iron-session/next/dist";

const cookieOptions = {
  cookieName: "carrotsession",
  password: process.env.COOKIE_PASSWORD,
};

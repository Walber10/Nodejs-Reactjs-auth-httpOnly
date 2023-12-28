import { Request } from "express";
import { User } from "../entities/User";

const extractQueryForRequest = (req: Request, query: string) => {
  if (req.query[query]) {
    // @ts-ignore
    return JSON.parse(req.query[query]);
  }
  return [];
};

const extractCookieFromRequest = (req: Request, key: string) => {
  if (req.headers.authorization) {
    return req.headers.authorization;
  }
  if (req.headers.cookie) {
    const results = req.headers.cookie.split(";");
    const filtered = results.filter((result: string) => {
      return result.startsWith(`${key}=`);
    });
    if (filtered.length > 0) {
      return filtered[0].split("=")[1];
    }
  }
  return null;
};

const cookieParser = (cookieName: string, cookies: string) => {
  const cookie = cookies
    .split(";")
    .find((c) => c.trim().startsWith(`${cookieName}=`))
    ?.split("=")[1];

  return cookie as string;
};

export { extractQueryForRequest, extractCookieFromRequest, cookieParser };

import { NextFunction } from "grammy";
import { isAdmin } from "./utils";
import { CustomContext } from "./globals";

export const adminMiddleware = async (
  ctx: CustomContext,
  next: NextFunction,
) => {
  ctx.devConfig = {
    isAdmin: isAdmin(ctx.from?.id),
  };

  await next();
};

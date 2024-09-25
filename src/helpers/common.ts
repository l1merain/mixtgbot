import { CustomContext, SessionData } from "../globals";

export const getInitialSession: () => SessionData = () => {
  return { pollTimeout: undefined };
};

export const clearSession = (ctx: CustomContext) =>
  (ctx.session = getInitialSession());

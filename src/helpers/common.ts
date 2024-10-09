import { CustomContext, SessionData } from "../globals";

export const getInitialSession: () => SessionData = () => {
  return {};
};

export const clearSession = (ctx: CustomContext) =>
  (ctx.session = getInitialSession());

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

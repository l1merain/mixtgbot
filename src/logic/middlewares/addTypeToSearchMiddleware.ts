import { CustomContext } from "../../globals";
import { NextFunction } from "grammy";
import { POLL_TYPE } from "../../helpers/pollHelpers";

export const addTypeToSearchMiddleware = async (
  ctx: CustomContext,
  next: NextFunction,
) => {
  ctx.devConfig.Type = POLL_TYPE.SEARCH;
  next();
};

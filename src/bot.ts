import { Bot, session } from "grammy";
import { CustomContext } from "./globals";
import { adminMiddleware } from "./middlewares";
import { emojiParser } from "@grammyjs/emoji";
import dotenv from "dotenv";
import { getInitialSession } from "./helpers/common";

dotenv.config();

export const bot = new Bot<CustomContext>(process.env.BOT_API_KEY as string);
bot
  .use(adminMiddleware)
  .use(session({ initial: getInitialSession }))
  .use(emojiParser());

import { Bot, session } from "grammy";
import { CustomContext } from "./globals";
import { adminMiddleware } from "./middlewares";
import { emojiParser } from "@grammyjs/emoji";
import dotenv from "dotenv";
import { conversations, createConversation } from "@grammyjs/conversations";
import { getInitialSession } from "./helpers/common";
import { pollNothingConversation } from "./logic/conversations/pollNothingConversation";
import { pollTemplateConversation } from "./logic/conversations/pollTemplateConversation";

dotenv.config();

export const bot = new Bot<CustomContext>(process.env.BOT_API_KEY as string);
bot
  .use(adminMiddleware)
  .use(
    session({
      initial: getInitialSession,
      getSessionKey: (ctx) => ctx.from?.id.toString(),
    }),
  )
  .use(conversations())
  .use(createConversation(pollNothingConversation, "pollNothingConversation"))
  .use(createConversation(pollTemplateConversation, "pollTemplateConversation"))
  .use(emojiParser());

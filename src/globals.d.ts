import { Context as C, SessionFlavor } from "grammy";
import { EmojiFlavor } from "@grammyjs/emoji";
import { ConversationFlavor } from "@grammyjs/conversations";
import { POLL_TYPE } from "./helpers/pollHelpers";

export interface SessionData {}

export interface CustomContext
  extends ConversationFlavor<EmojiFlavor<C & SessionFlavor<SessionData>>> {
  devConfig: {
    isAdmin: boolean;
    Type?: POLL_TYPE;
  };
}

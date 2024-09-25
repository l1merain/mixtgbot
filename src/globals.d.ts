import { Context as C, SessionFlavor } from "grammy";
import { EmojiFlavor } from "@grammyjs/emoji";

export interface SessionData {
  pollTimeout?: NodeJS.Timeout;
}

export interface CustomContext
  extends EmojiFlavor<C & SessionFlavor<SessionData>> {
  devConfig: {
    isAdmin: boolean;
  };
}

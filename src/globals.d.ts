import { Context as C, SessionFlavor } from "grammy";
import { EmojiFlavor } from "@grammyjs/emoji";

export interface SessionData {
  iphoneModels: any[];
  iphoneChosen: {
    models_iphones?: string;
    memory?: string;
    damaged?: string;
    restored_display?: string;
    sim?: string;
    equipment_iphone?: string;
    exterier_condition?: string;
  };
}

export interface CustomContext
  extends EmojiFlavor<C & SessionFlavor<SessionData>> {
  devConfig: {
    isAdmin: boolean;
  };
}

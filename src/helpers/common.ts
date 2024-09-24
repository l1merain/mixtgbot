import { CustomContext, SessionData } from "../globals";

export const getInitialSession: () => SessionData = () => {
  return { iphoneModels: [], iphoneChosen: {} };
};

export const clearSession = (ctx: CustomContext) =>
  (ctx.session = getInitialSession());

/**
 *
 * damaged: "true" | "false"
 * equipment_iphone: "box#cabel_typec_lightning" | "box" | "cabel_typec_lightning" | "zero"
 * exterier_condition: "normal" | "best" | "bad" | "well"
 * memory: "512"
 * models_iphones: "15promax"
 * restored_display: "1" | "0"
 * sim: "simple" | "esim"
 * *
 */

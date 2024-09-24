import { CustomContext } from "../../../globals";
import { InlineKeyboard } from "grammy";

export const iphoneDamagedCQ = async (ctx: CustomContext) => {
  await ctx.answerCallbackQuery();
  if (ctx.match && ctx.from) {
    const damaged = ctx.match[1];
    ctx.session.iphoneChosen.damaged = damaged;

    const keyboard = new InlineKeyboard()
      .text("Обычная + eSIM", "iphone_sim_simple")
      .text("eSIM", "iphone_sim_esim");

    await ctx.reply(`Тип сим-карты`, {
      reply_markup: keyboard,
    });
  }
};

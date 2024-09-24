import { InlineKeyboard } from "grammy";
import { CustomContext } from "../../../globals";

export const iphoneSimCQ = async (ctx: CustomContext) => {
  await ctx.answerCallbackQuery();

  if (ctx.match && ctx.from) {
    const sim = ctx.match[1];
    ctx.session.iphoneChosen.sim = sim;

    const keyboard = new InlineKeyboard()
      .text("Да", "iphone_restored_display_1")
      .text("Нет", "iphone_restored_display_0");

    await ctx.reply(`Производилась ли замена экрана?`, {
      reply_markup: keyboard,
    });
  }
};

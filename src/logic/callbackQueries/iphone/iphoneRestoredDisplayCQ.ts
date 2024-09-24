import { InlineKeyboard } from "grammy";
import { CustomContext } from "../../../globals";

export const iphoneRestoredDisplayCQ = async (ctx: CustomContext) => {
  await ctx.answerCallbackQuery();

  if (ctx.match && ctx.from) {
    const restored = ctx.match[1];
    ctx.session.iphoneChosen.restored_display = restored;

    const keyboard = new InlineKeyboard()
      .text("Как новый (из коробки)", "iphone_exterier_condition_best")
      .text("Хорошее", "iphone_exterier_condition_well")
      .row()
      .text("Среднее", "iphone_exterier_condition_normal")
      .text("Плохое", "iphone_exterier_condition_bad");

    await ctx.reply(`Внешнее состояние?`, {
      reply_markup: keyboard,
    });
  }
};

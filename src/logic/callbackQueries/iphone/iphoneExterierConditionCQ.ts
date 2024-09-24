import { CustomContext } from "../../../globals";
import { InlineKeyboard } from "grammy";

export const iphoneExterierConditionCQ = async (ctx: CustomContext) => {
  await ctx.answerCallbackQuery();

  if (ctx.match && ctx.from) {
    const exterier_condition = ctx.match[1];
    ctx.session.iphoneChosen.exterier_condition = exterier_condition;

    const keyboard = new InlineKeyboard()
      .text("Коробка (+1000руб)", "iphone_equipment_box")
      .text(
        "Кабель для зарядки (+700руб)",
        "iphone_equipment_cabel_typec_lightning",
      )
      .row()
      .text(
        "Кабель для зарядки и коробка (+1700руб)",
        "iphone_equipment_box#cabel_typec_lightning",
      );

    await ctx.reply(`Комплект?`, {
      reply_markup: keyboard,
    });
  }
};

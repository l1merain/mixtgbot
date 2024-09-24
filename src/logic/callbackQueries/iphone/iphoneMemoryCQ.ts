import { CustomContext } from "../../../globals";
import { clearSession } from "../../../helpers/common";
import { InlineKeyboard } from "grammy";

export const iphoneMemoryCQ = async (ctx: CustomContext) => {
  await ctx.answerCallbackQuery();
  if (ctx.match && ctx.from) {
    const models = ctx.session.iphoneModels;
    const memoryAbbr = ctx.match[1];
    const chosenDevice = models.find(
      (i) => i.device_abbr === ctx.session.iphoneChosen?.models_iphones,
    );

    if (!chosenDevice) {
      clearSession(ctx);
      return ctx.reply(
        "Мы не смогли найти модель с таким объемом памяти или вы не выбрали модель",
      );
    }

    const memoryChosen = chosenDevice.params.memory.vals.find(
      (i) => i.abbr === memoryAbbr,
    );

    if (!memoryChosen) {
      clearSession(ctx);
      return ctx.reply(
        "Мы не смогли найти модель с таким объемом памяти или вы не выбрали модель",
      );
    }

    ctx.session.iphoneChosen.memory = memoryChosen.abbr;

    const keyboard = new InlineKeyboard()
      .text("Что-то не работает", "iphone_damaged_true")
      .text("Все работает", "iphone_damaged_false");

    await ctx.reply(`Техническое состояние`, {
      reply_markup: keyboard,
    });
  }
};

import { InlineKeyboard } from "grammy";
import { CustomContext } from "../../../globals";
import { clearSession } from "../../../helpers/common";
import { getIphoneModels } from "../../../api/getIphoneModels";

export const iphoneDeviceCQ = async (ctx: CustomContext) => {
  await ctx.answerCallbackQuery();
  if (ctx.match && ctx.from) {
    const models = ctx.session.iphoneModels?.length
      ? ctx.session.iphoneModels
      : await getIphoneModels(ctx);
    const deviceAbbr = ctx.match[1];
    const chosenDevice = models.find((i) => i.device_abbr === deviceAbbr);

    if (!chosenDevice) {
      clearSession(ctx);
      return ctx.reply("Мы не смогли найти выбранную модель");
    }

    const memory = chosenDevice.params.memory.vals;
    ctx.session.iphoneChosen.models_iphones = chosenDevice.device_abbr;
    const keyboard = new InlineKeyboard();

    memory.forEach((i, idx) => {
      keyboard.text(i.name, `iphone_memory_${i.abbr}`);
      if ((idx + 1) % 2 === 0) keyboard.row();
    });

    await ctx.reply(`Какой объем памяти у вашего устройства?`, {
      reply_markup: keyboard,
    });
  }
};

import { CustomContext } from "../../globals";
import { InlineKeyboard } from "grammy";
import { getIphoneModels } from "../../api/getIphoneModels";

export const iphoneCheck = async (ctx: CustomContext) => {
  try {
    const models = await getIphoneModels(ctx);
    if (!models?.length) {
      return ctx.reply(
        `Не удалось получить ответ от севера ${ctx.emoji`${"sad_but_relieved_face"}`}`,
      );
    }

    const keyboard = new InlineKeyboard();

    models.forEach((i: any, idx: number) => {
      keyboard.text(
        `Iphone ${i?.device_name}` || "",
        `iphone_device_${i.device_abbr}`,
      );
      if ((idx + 1) % 2 === 0) keyboard.row();
    });

    await ctx.reply("Выберите модель", {
      reply_markup: keyboard.row().text("Отменить"),
    });
  } catch (e) {
    return ctx.reply(
      `Не удалось получить ответ от севера ${ctx.emoji`${"sad_but_relieved_face"}`}`,
    );
  }
};

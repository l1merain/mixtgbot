import { CustomContext } from "../../globals";
import { User } from "../../db/models/user";
import { v4 } from "uuid";
import { Keyboard } from "grammy";
import { clearSession } from "../../helpers/common";

export const start = async (ctx: CustomContext) => {
  const keyboard = new Keyboard().text(
    `${ctx.emoji`${"magnifying_glass_tilted_left"}`} Узнать цену iPhone`,
  );
  const emoji = ctx.emoji`${"smiling_face_with_sunglasses"}`;

  if (ctx.from?.id) {
    try {
      await User.create({
        id: v4(),
        telegram_id: +ctx.from.id,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        username: ctx.from.username,
      });
    } catch (e) {
      // если пользователь с таким telegramId есть, то просто вернет ошибку в консоль
      console.log(e);
    }
  }

  clearSession(ctx);
  await ctx.reply(
    "Привет, я буду генерировать опросы в этом чатике " + `${emoji}`,
    {
      reply_markup: {
        keyboard: keyboard.build(),
        resize_keyboard: true,
      },
      parse_mode: "Markdown", // Это позволяет добавлять форматирование
    },
  );
};

import { CustomContext } from "../../globals";
import { User } from "../../services/db/models/user";
import { clearSession } from "../../helpers/common";

export const start = async (ctx: CustomContext) => {
  const emoji = ctx.emoji`${"smiling_face_with_sunglasses"}`;

  if (ctx.from?.id) {
    try {
      await User.create({
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
      parse_mode: "Markdown", // Это позволяет добавлять форматирование
    },
  );
};

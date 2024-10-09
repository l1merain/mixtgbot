import { User } from "../../services/db/models/user";
import { CustomContext } from "../../globals";

export const stopPoll = (ctx: CustomContext) => {
  if (!ctx.from?.id) return;

  User.update(
    { is_poll: false },
    { where: { telegram_id: ctx.from?.id } },
  ).then(() => {
    ctx.reply("Больше вас не буду беспокоит :(");
  });
};

import { User } from "../../services/db/models/user";
import { CustomContext } from "../../globals";

export const startPoll = (ctx: CustomContext) => {
  if (!ctx.from?.id) return;

  User.update({ is_poll: true }, { where: { telegram_id: ctx.from?.id } }).then(
    () => {
      ctx.reply(
        "Теперь вы будете получать опросы. Как только появится новый я вас оповещу!",
      );
    },
  );
};

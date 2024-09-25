import { User } from "../../db/models/user";
import { CustomContext } from "../../globals";

export const textAll = async (ctx: CustomContext) => {
  if (!ctx.devConfig.isAdmin) return;

  try {
    const users = await User.findAll();
    const textToSend = ctx.message?.text
      ? ctx.message.text.split("/textAll ")[1]
      : "";

    if (!textToSend) return;

    for await (const user of users) {
      ctx.api.sendMessage(user.dataValues.telegram_id, textToSend);
    }
  } catch (e) {}
};

import { GrammyError, HttpError } from "grammy";
import { bot } from "./bot";
import { COMMANDS_LIST_INITIAL } from "./logic/commandsListConfig";
import { start, textAll, startPoll, stopPoll } from "./logic/commands/imports";
import { sequelize } from "./db/sequelize";
import { activePoll, updateActivePollAnswers } from "./logic/commands/poll";

const startBot = async () => {
  await sequelize.authenticate();
  await bot.api.setMyCommands(COMMANDS_LIST_INITIAL);

  bot.command("start", start);
  bot.command("textAll", textAll);
  bot.command("startPoll", startPoll);
  bot.command("stopPoll", stopPoll);

  bot.on("poll_answer", async (ctx) => {
    if (
      ctx.pollAnswer.option_ids?.length &&
      activePoll?.[ctx.pollAnswer.poll_id]
    ) {
      const answerIdx = ctx.pollAnswer.option_ids[0];
      updateActivePollAnswers(ctx.pollAnswer.poll_id, answerIdx);
    }
  });

  bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);

    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e);
    } else {
      console.error("Unknown error:", e);
    }
  });

  await bot.start();
};

try {
  startBot();
} catch (e) {
  console.log(e);
}

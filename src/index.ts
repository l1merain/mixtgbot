import { GrammyError, HttpError } from "grammy";
import { bot } from "./bot";
import { COMMANDS_LIST_INITIAL } from "./logic/commandsListConfig";
import { start, startPoll, stopPoll } from "./logic/commands/imports";
import { runMigrations, sequelize } from "./services/db/sequelize";
import { startRMQ } from "./services/rmq/rmq";
import { pollNothing } from "./logic/callbackQueries/pollNothing";
import { pollOff } from "./logic/callbackQueries/pollOff";
import { pollTemplate } from "./logic/callbackQueries/pollTemplate";
import { blockAnswerMiddleware } from "./logic/middlewares/blockAnswerMiddleware";
import { addTypeToSearchMiddleware } from "./logic/middlewares/addTypeToSearchMiddleware";

const startBot = async () => {
  if (process.env.NODE_ENV === "production") {
    await runMigrations();
  }
  await sequelize.authenticate();
  await startRMQ();

  await bot.api.setMyCommands(COMMANDS_LIST_INITIAL);

  bot.command("start", start);
  bot.command("start_poll", startPoll);
  bot.command("stop_poll", stopPoll);

  bot.callbackQuery(/poll_nothing_(.+)/, blockAnswerMiddleware, pollNothing);
  bot.callbackQuery(/poll_template_(.+)/, blockAnswerMiddleware, pollTemplate);
  bot.callbackQuery(
    /poll_search_(.+)/,
    blockAnswerMiddleware,
    addTypeToSearchMiddleware,
    pollTemplate,
  );
  bot.callbackQuery(/poll_off_(.+)/, blockAnswerMiddleware, pollOff);

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

import { GrammyError, HttpError } from "grammy";
import { bot } from "./bot";
import { COMMANDS_LIST_INITIAL } from "./logic/commandsListConfig";
import { start, textAll } from "./logic/commands/imports";
import { sequelize } from "./db/sequelize";
import { iphoneCheck } from "./logic/hears/iphoneCheck";
import {
  iphoneDamagedCQ,
  iphoneDeviceCQ,
  iphoneExterierConditionCQ,
  iphoneMemoryCQ,
  iphoneRestoredDisplayCQ,
  iphoneSimCQ,
  iphoneEquipmentCQ,
} from "./logic/callbackQueries/iphone/imports";

const startBot = async () => {
  await sequelize.authenticate();
  await bot.api.setMyCommands(COMMANDS_LIST_INITIAL);

  bot.command("start", start);
  bot.command("textAll", textAll);

  bot.hears("🔍 Узнать цену iPhone", iphoneCheck);

  // Iphone CBQ
  bot.callbackQuery(/^iphone_device_(.+)/, iphoneDeviceCQ);
  bot.callbackQuery(/^iphone_memory_(.+)/, iphoneMemoryCQ);
  bot.callbackQuery(/^iphone_damaged_(.+)/, iphoneDamagedCQ);
  bot.callbackQuery(/^iphone_sim_(.+)/, iphoneSimCQ);
  bot.callbackQuery(/^iphone_restored_display_(.+)/, iphoneRestoredDisplayCQ);
  bot.callbackQuery(
    /^iphone_exterier_condition_(.+)/,
    iphoneExterierConditionCQ,
  );
  bot.callbackQuery(/^iphone_equipment_(.+)/, iphoneEquipmentCQ);

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

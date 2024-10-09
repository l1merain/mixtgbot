import { BotCommand } from "@grammyjs/types/manage";

export const COMMANDS_LIST_INITIAL: readonly BotCommand[] = [
  { command: "start", description: "Начать работу с ботом" },
  { command: "start_poll", description: "Начать рассылку опросов" },
  { command: "stop_poll", description: "Завершить рассылку опросов" },
];

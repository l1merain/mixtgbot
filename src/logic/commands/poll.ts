import { Message } from "grammy/types";
import { bot } from "../../bot";
import { CustomContext } from "../../globals";
import { PollResult } from "../../db/models/pollResult";

const poll = {
  question: "Ты покрик?",
  options: ["Да", "Нет"],
};

export let activePoll: {
  [p: string]: {
    poll: Message.PollMessage["poll"] | undefined;
    answers: number[];
  };
} = {};

export const updateActivePollAnswers = (id: string, answer: number) => {
  if (activePoll?.[id]) {
    activePoll = {
      ...activePoll,
      [id]: {
        poll: activePoll[id].poll,
        answers: [...activePoll[id].answers, answer],
      },
    };
  }
};

const sendPoll = async (ctx: CustomContext) => {
  if (ctx.chatId && process.env.POLL_TIME_SEC) {
    const message = await bot.api.sendPoll(
      ctx.chatId,
      poll.question,
      poll.options.map((i) => ({ text: i })),
      {
        is_anonymous: false,
      },
    );

    activePoll = {
      ...activePoll,
      [message.poll.id]: { poll: message.poll, answers: [] },
    };

    ctx.session.pollTimeout = setTimeout(async () => {
      if (!ctx.chatId) return ctx.reply("Не передан chatID");
      if (activePoll[message.poll.id]) {
        await bot.api.stopPoll(ctx.chatId, message.message_id);
        const text = activePoll[message.poll.id].poll?.question || "";
        const answers = activePoll[message.poll.id].answers;

        const resultsObj = answers.reduce(
          (acc: { [p: number]: number }, el) => {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
          },
          {},
        );

        const values = Object.values(resultsObj);
        const totalVoterCount = values.reduce((a, b) => a + b, 0);
        const maxValue = Math.max(...values);
        const keysWithMaxValue = Object.keys(resultsObj).filter(
          (key) => resultsObj[+key] === maxValue,
        );

        // если победил всего 1 ответ
        if (keysWithMaxValue.length === 1) {
          await PollResult.create({
            total_votes: totalVoterCount,
            question: text,
            answer: message.poll.options?.[+keysWithMaxValue[0]]?.text || "",
          })
            .then(() => {
              delete activePoll[message.poll.id];
            })
            .catch((e) => console.log(e));
        }
      }

      await sendPoll(ctx);
    }, +process.env.POLL_TIME_SEC * 1000);
    return message.poll.id;
  } else {
    clearTimeout(ctx.session.pollTimeout);
  }
};

export const startPoll = async (ctx: CustomContext) => {
  if (!process.env.POLL_TIME_SEC)
    return await ctx.reply("Не передан process.env.POLL_TIME_SEC");

  if (ctx.session.pollTimeout)
    return await ctx.reply(
      "Рассылка уже идет, остановите ее, прежде чем начать новую",
    );

  await ctx.reply(
    `Рассылка опросов начата! Опросы буду отправляться с периодичностью в ${process.env.POLL_TIME_SEC} секунд`,
  );

  await sendPoll(ctx);
};

export const stopPoll = async (ctx: CustomContext) => {
  ctx.session.pollTimeout && clearTimeout(ctx.session.pollTimeout);
  ctx.session.pollTimeout = undefined;
  activePoll = {};
  await ctx.reply("Опрос приостановлен");
};

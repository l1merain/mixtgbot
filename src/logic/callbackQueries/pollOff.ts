import { CustomContext } from "../../globals";
import { Answer } from "../../services/db/models/answer";
import { v4 } from "uuid";
import { POLL_STATUSES, POLL_TYPE } from "../../helpers/pollHelpers";
import { PollDataModel } from "../../services/models/pollDataModel";

export const pollOff = async (ctx: CustomContext) => {
  await ctx.answerCallbackQuery();
  const match = ctx.match;
  if (!match || !ctx.from?.id) return;
  const questionId = match[1];

  Answer.create({
    id: v4(),
    data: JSON.stringify(
      new PollDataModel({ Status: POLL_STATUSES.OFF, Type: POLL_TYPE.OFF }),
    ),
    question_id: questionId,
    user_id: ctx.from.id,
  })
    .then((i) => {
      ctx.reply("Спасибо за ответ!");
    })
    .finally(() => {
      ctx.conversation.exit();
    });
};

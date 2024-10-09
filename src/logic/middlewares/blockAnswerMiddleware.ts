import { Answer } from "../../services/db/models/answer";
import { Question } from "../../services/db/models/question";
import { CustomContext } from "../../globals";
import { NextFunction } from "grammy";

export const blockAnswerMiddleware = async (
  ctx: CustomContext,
  next: NextFunction,
) => {
  const match = ctx.match;
  if (!match || !ctx.from?.id) return;
  const questionId = match[1];

  const answeredQuestion = await Answer.findOne({
    where: { user_id: ctx.from.id, question_id: questionId },
  });
  const questionFromDb = await Question.findOne({
    where: { id: questionId, is_active: false },
  });

  if (answeredQuestion?.dataValues.id) {
    await ctx.conversation.exit();
    return ctx.reply("Меня не обманешь, ты уже отвечал на этот вопрос :)");
  }

  if (questionFromDb?.dataValues.id) {
    await ctx.conversation.exit();
    return ctx.reply(
      "Вопрос уже неактивен. Пожалуйста, дождитесь нового или ответьте на последний полученный",
    );
  }

  next();
};

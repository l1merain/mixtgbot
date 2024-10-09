import { CustomContext } from "../../globals";
import { Conversation } from "@grammyjs/conversations";
import { Question } from "../../services/db/models/question";
import { Answer } from "../../services/db/models/answer";
import { v4 } from "uuid";
import { PollDataModel } from "../../services/models/pollDataModel";

export const pollNothingConversation = async (
  conversation: Conversation<CustomContext>,
  ctx: CustomContext,
) => {
  try {
    const questionId = ctx.match?.[1];

    do {
      await ctx.reply(
        "Укажите дневной лимит (цифру в рублях). Отправьте в ответ только цифру, например 150 или 150.2",
      );
      ctx = await conversation.wait();
    } while (ctx.message?.text && !/^\d+(\.\d+)?$/.test(ctx.message?.text));
    const dailyLimit = ctx.message?.text;

    if (!dailyLimit)
      return ctx.reply(
        "Если вы решили поменять ответ или выбрали ответ из другого вопроса, то выберите его снова",
      );

    if (questionId && ctx.from?.id) {
      const question = await Question.findOne({
        where: { id: questionId, is_active: true },
      });

      if (question?.dataValues.id) {
        const skuInfo = JSON.parse(question.dataValues.data).find(
          (i: any) => i.Position === question.dataValues.target_position,
        );

        if (skuInfo) {
          const promotion = skuInfo.Promotion;

          Answer.create({
            id: v4(),
            data: JSON.stringify(
              new PollDataModel({
                ...promotion,
                DailyLimit: dailyLimit + " ₽",
              }),
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
        } else {
          await ctx.reply("[Error]: Sku не найден. pollNothingConversation");
        }
      } else {
        await ctx.reply("Вопрос уже не актуален, ответьте на новый");
      }
    }
  } catch (error) {
    console.error("Error pollNothingConversation", error);
    await ctx.reply("Произошла ошибка pollNothingConversation");
  }
};

import { CustomContext } from "../../globals";
import { Conversation } from "@grammyjs/conversations";
import { Question } from "../../services/db/models/question";
import { Answer } from "../../services/db/models/answer";
import { v4 } from "uuid";
import { PollDataModel } from "../../services/models/pollDataModel";
import { POLL_TYPE } from "../../helpers/pollHelpers";

export const pollTemplateConversation = async (
  conversation: Conversation<CustomContext>,
  ctx: CustomContext,
) => {
  try {
    const Type = ctx.devConfig?.Type || POLL_TYPE.TEMPLATE;
    const questionId = ctx.match?.[1];

    do {
      await ctx.reply(
        "Укажите дневной лимит (цифру в рублях). Отправьте в ответ только цифру, например – 150 или 150.2",
      );
      ctx = await conversation.wait();
    } while (ctx.message?.text && !/^\d+(\.\d+)?$/.test(ctx.message?.text));

    const dailyLimit = ctx.message?.text;

    if (!dailyLimit)
      return ctx.reply(
        "Если вы решили поменять ответ или выбрали ответ из другого вопроса, то выберите его снова",
      );

    do {
      await ctx.reply(
        "Укажите ставку (в процентах). Отправьте в ответ только цифру, например – 12 или 12.5",
      );
      ctx = await conversation.wait();
    } while (ctx.message?.text && !/^\d+(\.\d+)?$/.test(ctx.message?.text));

    const Value = ctx.message?.text;

    if (!Value)
      return ctx.reply(
        "Если вы решили поменять ответ или выбрали ответ из другого вопроса, то выберите его снова",
      );

    if (!questionId || !ctx.from?.id)
      return ctx.reply("Не переданы questionId или ctx.from?.id");

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
              Value,
              Type,
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
  } catch (error) {
    console.error("Error creating capsule:", error);
    await ctx.reply("Произошла ошибка при создании капсулы.");
  }
};

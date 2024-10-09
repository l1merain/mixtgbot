import { CustomContext } from "../../globals";

export const pollTemplate = async (ctx: CustomContext) => {
  await ctx.answerCallbackQuery();
  await ctx.conversation.enter("pollTemplateConversation");
};

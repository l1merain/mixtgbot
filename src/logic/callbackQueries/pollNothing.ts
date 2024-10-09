import { CustomContext } from "../../globals";

export const pollNothing = async (ctx: CustomContext) => {
  await ctx.answerCallbackQuery();
  await ctx.conversation.enter("pollNothingConversation");
};

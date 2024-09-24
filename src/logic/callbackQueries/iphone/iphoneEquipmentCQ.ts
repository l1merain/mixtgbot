import { CustomContext } from "../../../globals";
import { getIphonePrice } from "../../../api/getIphonePrice";

export const iphoneEquipmentCQ = async (ctx: CustomContext) => {
  await ctx.answerCallbackQuery();

  if (ctx.match && ctx.from) {
    const equipment = ctx.match[1];
    ctx.session.iphoneChosen.equipment_iphone = equipment;
    const iphoneWasChosen = ctx.session.iphoneChosen;
    try {
      const data = await getIphonePrice(ctx);

      await ctx.reply(
        `
${ctx.emoji`${"mobile_phone"}`} *Модель iPhone*: ${iphoneWasChosen.models_iphones}

${ctx.emoji`${"floppy_disk"}`} *Память*: ${iphoneWasChosen.memory && +iphoneWasChosen.memory < 10 ? iphoneWasChosen.memory + " ТБ" : iphoneWasChosen.memory + " ГБ"} 

${ctx.emoji`${"red_square"}`} *Повреждения*: ${iphoneWasChosen.damaged === "false" ? "Нет" : "Да"}

${ctx.emoji`${"antenna_bars"}`} *Тип SIM-карты*: ${iphoneWasChosen.sim === "simple" ? "SIM + eSIM" : "eSIM"}

${ctx.emoji`${"money_bag"}`} *Оценочная стоимость*: ${data.counted_price || data.max_price} руб.
      
  `,
        {
          parse_mode: "Markdown",
        },
      );
    } catch (e) {
      await ctx.reply("Что-то пошло не так, повторите пожалуйста оценку снова");
    }
  }
};

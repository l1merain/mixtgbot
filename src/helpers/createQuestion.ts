import { getRandomNumber } from "./common";

const renderText = (
  targetPosition: number,
  skus: { sku: string; Position: number; Promotion: any }[],
) => `
<b>Что делать с рекламной компанией товара на позиции <b>${targetPosition}</b>?</b>

${skus
  .map((i, idx) => {
    const isTarget = i.Position === targetPosition;
    return `${isTarget ? "<ins>" : ""}${idx + 1}. SKU: <a href="https://www.ozon.ru/product/${i.sku}">${i.sku}</a>.\nПозиция в выдаче: ${i.Position}.\nТип рекламы: ${i.Promotion.TypeString}, ${i.Promotion.Value}, ${i.Promotion.SubValue}${isTarget ? "</ins>" : ""}`;
  })
  .join("\n")}
`;

export const createQuestion = (message: {
  CompetitorItemsByCity: { [p: string]: any };
}) => {
  const citiesKeys = Object.keys(message.CompetitorItemsByCity);
  const citiesLength = citiesKeys.length;
  const randomCityIdx = getRandomNumber(0, citiesLength - 1);
  const randomKey = citiesKeys[randomCityIdx];
  const randomCityData = message.CompetitorItemsByCity[randomKey];

  // удаляем первый элемент массива тк это наша SKU, которая может повторяться или не входить в первую десятку
  randomCityData.shift();
  // берем первые 10 элементов массива
  const firstTenItems = randomCityData.slice(0, 10);
  // выбираем случайную позицию из длинны массива выбранных SKU (c 1 позиции по 10 включительно)
  const chosenSkuPositionToAskAbout = getRandomNumber(1, firstTenItems.length);
  const formattedFirstTenSkus = firstTenItems.map((i: any) => ({
    sku: i.ItemInfo.sku,
    Position: i.Position,
    Promotion: i.Promotion,
  }));

  const text = renderText(chosenSkuPositionToAskAbout, formattedFirstTenSkus);

  return { text, skus: formattedFirstTenSkus, chosenSkuPositionToAskAbout };
};

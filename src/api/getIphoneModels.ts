import axios from "axios";
import UserAgent from "user-agents";
import { CustomContext } from "../globals";

export const getIphoneModels = async (ctx: CustomContext) => {
  const userAgent = new UserAgent();

  const response = await axios.post(
    "https://damprodam.ru/py/iphone_buyout/params",
    {
      headers: {
        "User-Agent": userAgent.toString(),
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
      maxRedirects: 5,
    },
  );

  const models = response.data;
  ctx.session.iphoneModels = models;

  return models;
};

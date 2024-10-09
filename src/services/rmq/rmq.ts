import amqp from "amqplib";
import { createQuestion } from "../../helpers/createQuestion";
import { User } from "../db/models/user";
import { bot } from "../../bot";
import { InlineKeyboard } from "grammy";
import { Question } from "../db/models/question";
import { v4 } from "uuid";

let channel: amqp.Channel | null = null;
let connection: amqp.Connection | null = null;
let timeout: NodeJS.Timeout;
let reconnectionAttempt = 0;

let lastSentTime = 0; // Время последней отправки сообщения
const SEND_INTERVAL = 10 * 60 * 1000;
const CONNECTION_STRING = process.env.AMQP_CONNECTION_STRING;

const setupConnection = async () => {
  if (!CONNECTION_STRING) {
    throw new Error("You didn't provide amqp connection string");
  }

  // Устанавливаем соединение с RabbitMQ
  amqp
    .connect(CONNECTION_STRING)
    .then(async (newConnection) => {
      console.log("[AMQP]: Connected gracefully");
      reconnectionAttempt = 0;
      clearTimeout(timeout);

      connection = newConnection;

      connection.on("close", function () {
        reconnect();
      });

      // Создаём канал
      channel = await connection.createChannel();

      await startConsumer();
    })
    .catch((e) => {
      reconnect();

      console.log(e);
    });
};

const startConsumer = async () => {
  if (!channel || !process.env.AMQP_QUEUE_NAME) {
    console.error(
      "Channel or queue is not available, skipping consumer start.",
    );
    return;
  }

  await channel.consume(
    process.env.AMQP_QUEUE_NAME,
    async (msg) => {
      if (msg && msg.content) {
        const now = Date.now();

        // если не прошло времени указанного интервала - сообщение не отправляется
        if (now - lastSentTime < SEND_INTERVAL * 60 * 1000) return;
        lastSentTime = now;

        const { text, skus, chosenSkuPositionToAskAbout } = createQuestion(
          JSON.parse(msg.content.toString("utf-8")),
        );

        await Question.update(
          { is_active: false },
          { where: { is_active: true } },
        );
        const question = await Question.create({
          id: v4(),
          data: JSON.stringify(skus),
          target_position: chosenSkuPositionToAskAbout,
          text,
        });
        const keyboard = new InlineKeyboard()
          .text("Ничего не делать", `poll_nothing_${question.dataValues.id}`)
          .row()
          .text(
            "Использовать трафареты",
            `poll_template_${question.dataValues.id}`,
          )
          .row()
          .text(
            "Использовать продвижение в поиске",
            `poll_search_${question.dataValues.id}`,
          )
          .row()
          .text("Отключить рекламу", `poll_off_${question.dataValues.id}`);

        const users = await User.findAll({ where: { is_poll: true } });

        for (const user of users) {
          bot.api
            .sendMessage(user.dataValues.telegram_id, text, {
              parse_mode: "HTML",
              reply_markup: keyboard,
              // @ts-ignore
              disable_web_page_preview: true,
            })
            .catch((e) => {
              console.log(e.message);
            });
        }
      }
    },
    {
      noAck: false,
    },
  );
};

const reconnect = () => {
  reconnectionAttempt++;
  console.error(
    `[AMQP]: Reconnecting. Reconnection attempt ${reconnectionAttempt}`,
  );
  timeout = setTimeout(setupConnection, 10000);
};

export const startRMQ = async () => {
  try {
    await setupConnection();
  } catch (e) {
    console.log(e);
  }
};

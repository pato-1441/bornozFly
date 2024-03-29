import twilio from "twilio";
import logger from "./logger.js";

const accountSid = process.env.TWILIO_ACCOUNTS_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const sendSMS = async () => {
  try {
    const message = await client.messages.create({
      body: "Hola esto es un mensaje SMS desde Node.js",
      from: "+16083705783",
      to: process.env.DEV_NUMBER,
    });
    console.log(message);
  } catch (error) {
    logger.error(error);
  }
};

const sendWhatsapp = async (data) => {
  try {
    const message = await client.messages.create({
      body: `*Nuevo pedido de:*            
${data.body.orderFlightSelect} - ${data.body.orderFlightPrice}

*Fecha:*
${data.body.orderFlightDate}

*Realizado por:*
${data.user.username} - ${data.user.firstname} ${data.user.lastname}
            `,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${process.env.DEV_WHATSAPP_NUMBER}`,
    });
    console.log(message);
  } catch (error) {
    logger.error(error);
  }
};

export const twilioService = { sendSMS, sendWhatsapp };

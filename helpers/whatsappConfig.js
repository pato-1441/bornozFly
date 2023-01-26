import twilio from "twilio";
import logger from "./logger";

const accountSid = process.env.TWILIOACCOUNTSID;
const authToken = process.env.TWILIOAUTHTOKEN;

const client = twilio(accountSid, authToken);

try {
  const message = await client.messages.create({
    body: "Hola soy un SMS desde node.js",
    from: "+16083705783",
    to: "+543435142341",
  });
} catch (error) {
  logger.error(error);
}

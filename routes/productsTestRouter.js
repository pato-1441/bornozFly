import { Router } from "express";
import { faker } from "@faker-js/faker";
import logger from "../logger.js";

faker.locale = "es";
const { commerce, image } = faker;

const productsTestRouter = Router();

productsTestRouter.get("/products-test/", (req, res, next) => {
  try {
    let data = { products: [] };

    for (let i = 0; i < 5; i++) {
      data.products.push({
        name: commerce.product(),
        price: commerce.price(),
        url: image.technics(),
      });
    }
    logger.info(data);
    res.render("products", data);
  } catch (error) {
    next(error);
  }
});

productsTestRouter.get("/randoms", (req, res, next) => {
  try {
    const { quantity = 1000000 } = req.query;
    if (isNaN(Number(quantity))) {
      res.json({ error: "You send a string, it must be a number" });
    } else {
      const quantityTimes = {};
      for (let i = 0; i < quantity; i++) {
        const number = Math.floor(Math.random() * 1000 + 1);
        if (!quantityTimes[number]) quantityTimes[number] = 0;
        quantityTimes[number]++;
      }
      logger.info(quantityTimes);
      res.send(quantityTimes);
    }
  } catch (error) {
    next(error);
  }
});

export default productsTestRouter;

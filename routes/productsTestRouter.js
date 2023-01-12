import { Router } from "express";
import { faker } from "@faker-js/faker";
import { fork } from "child_process";
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
      logger.info(quantity);
      const child = fork("calc.js");

      child.on("message", (result) => {
        if (result == "ready") {
          child.send(Number(quantity));
        } else {
          logger.info("I end here");
          res.json(result);
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

export default productsTestRouter;

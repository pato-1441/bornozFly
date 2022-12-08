import { Router } from "express";
import { faker } from "@faker-js/faker";

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
    console.log(data);
    res.render("products", data);
  } catch (error) {
    next(error);
  }
});

export default productsTestRouter;

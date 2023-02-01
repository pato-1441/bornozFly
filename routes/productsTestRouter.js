import { Router } from "express";
import { productsTestController } from "../controllers/index.js";

const productsTestRouter = Router();

productsTestRouter.get(
  "/products-test/",
  productsTestController.generateProducts
);

productsTestRouter.get("/randoms", productsTestController.calculateRandoms);

export default productsTestRouter;

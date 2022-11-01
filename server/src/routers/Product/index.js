import { Router } from "express";
import { ProductDao } from "../../Dao/index.js";
import { verifyRole } from "../../middlewares/index.js";
import { DATE_UTILS, JOI_VALIDATOR } from "../../utils/index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const product = await ProductDao.getAll();
    res.send(product);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductDao.getById(Number(id));
    res.send(product);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", verifyRole, async (req, res) => {
  try {
    const { title, description, code, thumbnail, price, stock } = req.body;

    const product = await JOI_VALIDATOR.product.validateAsync({
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
      timestamp: DATE_UTILS.getTimestamp(),
    });

    const createdProduct = await ProductDao.save(product);

    res.send(createdProduct);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", verifyRole, async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, code, thumbnail, price, stock } = req.body;

    const product = await JOI_VALIDATOR.product.validateAsync({
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
      timestamp: DATE_UTILS.getTimestamp(),
    });

    const modifiedProduct = await ProductDao.updateById(Number(id), product);
    res.send(modifiedProduct);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", verifyRole, async (req, res) => {
  try {
    const { id } = req.params;
    await ProductDao.deleteById(Number(id));
    res.send({ success: true });
  } catch (error) {
    res.send({ error, success: false });
  }
});

export { router as ProductRouter };

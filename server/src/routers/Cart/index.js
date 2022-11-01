import { Router } from "express";
import { CartDao, ProductDao } from "../../Dao/index.js";
import { DATE_UTILS } from "../../utils/index.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };

    const cart = await CartDao.save(baseCart);

    res.send({ success: true, cartId: cart.id });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await CartDao.getById(Number(cartId));
    if (!cart) return res.send({ success: false, message: "Cart not found" });

    cart.products = [];
    await CartDao.deleteById(Number(cartId));

    res.send({ success: true, message: "Cart deleted" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

router.get("/:cartId/products", async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await CartDao.getById(Number(cartId));
    if (!cart) return res.send({ success: false, message: "Cart not found" });

    res.send({ success: true, products: cart.products });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

router.post("/:cartId/products", async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId } = req.body;

    const cart = await CartDao.getById(Number(cartId));
    if (!cart) return res.send({ success: false, message: "Cart not found" });

    const product = await ProductDao.getById(Number(productId));
    if (!product)
      return res.send({ success: false, message: "Product not found" });

    // Warning error in future
    cart.products.push(product);

    const updatedCart = await CartDao.updateById(Number(cartId), cart);

    res.send({ success: true, cart: updatedCart });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:cartId/products/:productId", async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId } = req.params;
    const cart = await CartDao.getById(Number(cartId));
    if (!cart) return res.send({ success: false, message: "Cart not found" });

    const product = await ProductDao.getById(Number(productId));
    if (!product)
      return res.send({ success: false, message: "Product not found" });

    //console.log(cart.products)
    const productsFiltered = cart.products.filter(
      (prod) => prod.id !== Number(productId)
    );

    cart.products = productsFiltered;

    await CartDao.updateById(Number(cartId), cart);

    res.send({
      success: true,
      message: `Product removed from CartID: ${cartId} succesfully`,
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

export { router as CartRouter };

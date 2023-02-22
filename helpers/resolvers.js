import { User, Product, Flight, Message, Order } from "../models/index.js";

const resolvers = {
  Query: {
    hello: () => "Hello world",
    getAllUsers: async () => {
      const users = await User.find();
      return users;
    },
    getAllProducts: async () => {
      const products = await Product.find();
      return products;
    },
  },
};

export default resolvers;

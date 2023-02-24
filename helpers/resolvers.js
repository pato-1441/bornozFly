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
    getAllMessages: async () => {
      const messages = await Message.find();
      return messages;
    },
    getAllFlights: async () => {
      const flights = await Flight.find();
      return flights;
    },
    getAllOrders: async () => {
      const orders = await Order.find();
      return orders;
    },
  },
};

export default resolvers;

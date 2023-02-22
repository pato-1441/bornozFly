import { User } from "../models/user.js";

const resolvers = {
  Query: {
    hello: () => "Hello world",
    getAllUsers: async () => {
      const users = await User.find();
      return users;
    },
  },
};

export default resolvers;

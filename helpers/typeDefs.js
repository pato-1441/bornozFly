import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID
    username: String
    password: String
    firstname: String
    lastname: String
    address: String
    birthday: String
    mobilenumber: String
  }

  type Product {
    name: String
    price: Float
    url: String
  }
  #type Product {
  #  name: { type: String, required: true },
  #  price: { type: Number, required: true },
  #  url: { type: String, required: true },
  #}

  #type Message {
  #  author: {
  #  id: { type: String, required: false },
  #  name: { type: String, required: true },
  #  surname: { type: String, required: false },
  #  age: { type: Number, required: false },
  #  alias: { type: String, required: false },
  #  avatar: { type: String, required: false },
  #  },
  #  text: { type: String, required: true },
  #  date: {
  #    day: { type: String, required: true },
  ##    hours: { type: String, required: true },
  #    minutes: { type: String, required: true },
  #    milliseconds: { type: String, required: true },
  #  },
  #}

  #type Flight {
  #  name: { type: String, required: true },
  #  availability: { type: String, required: true },
  #  price: { type: Number, required: true },
  #  image: { type: String, required: true },
  #}

  #type Order {
  #  user: { type: String, required: true },
  #  products: { type: Object, required: true },
  #  date: {
  #    day: { type: String, required: true },
  #    hours: { type: String, required: true },
  #    minutes: { type: String, required: true },
  #    milliseconds: { type: String, required: true },
  #  },
  #}

  type Query {
    hello: String
    getAllUsers: [User]
    getAllProducts: [Product]
  }

  # type Mutation {
  #  createUser
  # }
`;

export default typeDefs;

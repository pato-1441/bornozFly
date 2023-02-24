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
    name: String!
    price: Float!
    url: String!
  }

  type Author {
    id: String
    name: String!
    surname: String
    age: Float
    alias: String
    avatar: String
  }

  type Date {
    day: String!
    hours: String!
    minutes: String!
    milliseconds: String!
  }

  type Message {
    author: Author
    text: String!
    date: Date
  }

  type Flight {
    name: String!
    availability: String!
    price: Float!
    image: String!
  }

  type Order {
    user: User
    products: Product
    date: Date
  }

  type Query {
    hello: String
    getAllUsers: [User]
    getAllProducts: [Product]
    getAllMessages: [Message]
    getAllFlights: [Flight]
    getAllOrders: [Order]
  }

  # type Mutation {
  #  createUser
  # }
`;

export default typeDefs;

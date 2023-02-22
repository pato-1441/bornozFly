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

  type Query {
    hello: String
    getAllUsers: [User]
  }

  # type Mutation {
  #  createUser
  # }
`;

export default typeDefs;

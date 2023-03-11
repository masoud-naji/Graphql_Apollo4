import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { db } from "./data.js";
import { Query } from "./resolvers/Query.js";
import { Product } from "./resolvers/Product.js";
import { Category } from "./resolvers/Category.js";
import { Mutation } from "./resolvers/Mutation.js";
import { readFileSync } from "fs";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

const resolvers = {
  Query,
  Product,
  Category,
  Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    if (!db.products || !db.categories) {
      throw new Error("No data found");
    }
    return {
      db,
    };
  },
});

console.log(`🚀 Server ready at ${url}`);

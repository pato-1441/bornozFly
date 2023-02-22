// init project
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import passport from "passport";
import {
  infoRouter,
  passportAuthsRouter,
  productsTestRouter,
} from "./routes/index.js";
import { passportInit } from "./passport/init.js";
import minimist from "minimist";
import os from "os";
import cluster from "cluster";
import { initServer } from "./socket.js";
import http from "http";
import bodyParser from "body-parser";
import logger from "./helpers/logger.js";

import { ApolloServer } from "apollo-server-express";
import typeDefs from "./helpers/typeDefs.js";
import resolvers from "./helpers/resolvers.js";

const args = minimist(process.argv.slice(2), {
  alias: {
    p: "PORT",
    m: "MODE",
  },
  default: {
    p: 8080,
    m: "fork",
  },
});

const { MODE } = args;
const PORT = process.env.PORT;

if (MODE === "cluster" && cluster.isPrimary) {
  const length = os.cpus().length;

  for (let i = 0; i < length; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    logger.info(`Worker ${worker} died`);
  });
} else {
  const app = express();

  app.use(cookieParser());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 600,
      }),
      secret: "secretkey",
      resave: false,
      saveUninitialized: false,
      rolling: false,
      cookie: {
        maxAge: 600000,
      },
    })
  );
  app.engine(
    "hbs",
    handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs" })
  );
  app.set("view engine", "hbs");
  app.set("views", "./views");
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  passportInit();
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static("./public"));

  app.use("/", passportAuthsRouter);
  app.use("/api", productsTestRouter);
  app.use("/info", infoRouter);
  app.use((error, req, res, next) => {
    if (error.statusCode) {
      return res.status(error.statusCode).send(`Error ${error.statusCode}`);
    }
    logger.info(error);
    res.status(500).json({ error: "Somethings brokes..." });
  });
  //twilioService.sendSMS()

  // listen for requests :)
  const server = http.createServer(app);
  initServer(server);

  // apollo server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app });
  app.use("*", (req, res) => res.status(404).send("URL Resource not found"));

  server.listen(PORT, async () => {
    logger.info(
      "Your app is listening on " +
        `${process.env.NODE_URL}:${process.env.PORT}/`
    );
    logger.info("Environment: " + process.env.NODE_ENV);
  });
}

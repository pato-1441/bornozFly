import { Server } from "socket.io";
import { Products, Messages, Flights } from "./db/db.js";

let io;

const initServer = (httpServer) => {
  io = new Server(httpServer);
  setEvents(io);
};

const setEvents = (io) => {
  const ProductsDB = new Products();
  const MessagesDB = new Messages();
  const FlightsDB = new Flights();

  io.on("connection", async (socketClient) => {
    console.log(
      "A new client with the ID: ",
      socketClient.id,
      " has connected."
    );

    //console.log(await ProductsDB.readProducts());
    if ((await ProductsDB.readProducts().length) !== 0) {
      //emit("product-history", await ProductsDB.readProducts());
    }

    //console.log(await MessagesDB.readMessages());
    if ((await MessagesDB.readMessages().length) !== 0) {
      //emit("message-history", await MessagesDB.readMessages());
    }

    if ((await FlightsDB.readFlights().length) !== 0) {
      emit("flight-history", await FlightsDB.readFlights());
    }

    socketClient.on("orderselectchange", async (data) => {
      emit("flight-name", await FlightsDB.readFlightByName(data));
    })

    socketClient.on("disconnection", () => {
      console.log(
        "The client with the ID: ",
        socketClient.id,
        " has disconnected."
      );
    });

    socketClient.on("product", async (data) => {
      await ProductsDB.addProduct(data);
      emit("product", await ProductsDB.readProducts());
    });

    socketClient.on("message", async (data) => {
      data.id = socketClient.id;
      await MessagesDB.addMessage(data);
      emit("message", await MessagesDB.readMessages());
    });
  });
};

const emit = (action, data) => {
  io.emit(action, data);
};

export { initServer, emit };

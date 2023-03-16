// Toast
const toastLogin = document.getElementById("toastLogin");
setTimeout(() => {
  toastLogin.classList.add("hidden");
}, 4000);

// Products
const productNameInput = document.getElementById("nombreProducto");
const productPriceInput = document.getElementById("precioProducto");
const productUrlInput = document.getElementById("urlProducto");
const productForm = document.getElementById("enviarProducto");
const tableBody = document.getElementById("products");

// Messages
const messageForm = document.getElementById("enviarMensaje");
const usernameAlias = document.getElementById("usernameAlias");
const messageInput = document.getElementById("messageInput");
const messageOutput = document.getElementById("messageOutput");
const socket = io();

// Flights
const orderFlightSelect = document.getElementById("orderFlightSelect");
const orderFlightDate = document.getElementById("orderFlightDate");
const orderFlightPrice = document.getElementById("orderFlightPrice");

const flightCardsContainer = document.getElementById("flightCardsContainer");

orderFlightSelect.onchange = (e) => {
  console.log(orderFlightSelect.value);
  e.preventDefault();
  socket.emit("orderselectchange", orderFlightSelect.value);
};

socket.on("connect", () => {
  console.log("Connection to the server established ✅");
});

// render flight cards
socket.on("flight-cards", (flights) => {
  fetch("/templates/flightCardLayout.hbs")
    .then((template) => template.text())
    .then((text) => {
      const template = Handlebars.compile(text);
      flights.forEach((el) => {
        const div = document.createElement("div");
        div.innerHTML = template(el);
        flightCardsContainer.appendChild(div);
      });
    });
});

// available flights
socket.on("flight-history", (flights) => {
  fetch("/templates/flightLayout.hbs")
    .then((template) => template.text())
    .then((text) => {
      const template = Handlebars.compile(text);
      flights.forEach((el) => {
        const option = document.createElement("option");
        option.innerHTML = template(el);
        orderFlightSelect.appendChild(option);
      });
    });
});

// available date of flights
socket.on("flight-name", (flight) => {
  fetch("/templates/flightLayout.hbs")
    .then((template) => template.text())
    .then((text) => {
      orderFlightDate.innerHTML = "";
      const template = Handlebars.compile(text);
      flight[0].dates.forEach((el) => {
        const option = document.createElement("option");
        option.innerHTML = `${el}`;
        orderFlightDate.appendChild(option);
      });
    });
});

// available flights quantity
socket.on("flight-name", (flight) => {
  fetch("/templates/flightLayout.hbs")
    .then((template) => template.text())
    .then((text) => {
      orderFlightPrice.innerHTML = "";
      const template = Handlebars.compile(text);
      const option = document.createElement("option");
      option.innerHTML = `$${flight[0].price}`;
      orderFlightPrice.appendChild(option);
    });
});

// add product
socket.on("product", (data) => {
  fetch("/templates/productsLayout.hbs")
    .then((template) => template.text())
    .then((text) => {
      tableBody.innerHTML = "";
      const template = Handlebars.compile(text);
      data.forEach((el) => {
        const tr = document.createElement("tr");
        tr.innerHTML = template(el);
        tableBody.appendChild(tr);
      });
    });
});

// read products
socket.on("product-history", (products) => {
  fetch("/templates/productsLayout.hbs")
    .then((template) => template.text())
    .then((text) => {
      const template = Handlebars.compile(text);
      products.forEach((el) => {
        const tr = document.createElement("tr");
        tr.innerHTML = template(el);
        tableBody.appendChild(tr);
      });
    });
});

//add messages
socket.on("message", (data) => {
  fetch("/templates/messageLayout.hbs")
    .then((template) => template.text())
    .then((text) => {
      messageOutput.innerHTML = "";
      const template = Handlebars.compile(text);
      data.forEach((el) => {
        const li = document.createElement("li");
        li.classList.add("no-dots");
        li.innerHTML = template(el);
        messageOutput.appendChild(li);
      });
    });
});

// read messages
socket.on("message-history", (messages) => {
  fetch("/templates/messageLayout.hbs")
    .then((template) => template.text())
    .then((text) => {
      const template = Handlebars.compile(text);
      messages.forEach((el) => {
        const div = document.createElement("div");
        div.innerHTML = template(el);
        messageOutput.appendChild(div);
      });
    });
});

(() => {
  // Toast

  const toastLogin = document.getElementById("toastLogin");
  setTimeout(()=>{
    toastLogin.classList.add('hidden')
  },4000);

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

  /*
  productForm.onsubmit = (e) => {
    e.preventDefault();
    socket.emit("product", {
      name: productNameInput.value,
      price: productPriceInput.value,
      url: productUrlInput.value,
    });
  };
  */

  /*
  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("message", {
      author: {
        name: usernameAlias.value,
      },
      text: messageInput.value,
      date: {
        day: new Date().toLocaleDateString(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        milliseconds: new Date().getMilliseconds(),
      },
    });
    messageInput.value = "";
  });
  */

  socket.on("connect", () => {
    console.log("Connection to the server established ✅");
  });

  socket.on("flight-history", (flights) => {
    fetch("/templates/flightLayout.hbs")
      .then((template) => template.text())
      .then((text) => {
        const template = Handlebars.compile(text);
        flights.forEach((el) => {
          const option = document.createElement("option");
          option.innerHTML = template(el);
          orderFlightSelect.appendChild(option)
        })
      })
  })

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
})();

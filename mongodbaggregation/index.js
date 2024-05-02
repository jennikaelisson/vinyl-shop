console.log("index.js");

let express = require("express");
let cors = require("cors");
let DatabaseConnection = require("./src/database/DatabaseConnection");

let url = "mongodb://localhost:27017";

DatabaseConnection.getInstance().setUrl(url);

let app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

app.get("/orders", async (request, response) => {
  let orders = await DatabaseConnection.getInstance().getAllOrders();
  response.json(orders);
});

app.get("/products", async (request, response) => {
  let products = await DatabaseConnection.getInstance().getProducts();

  response.json(products);
});

// app.post("/create-new-order", async (request, response) => {
//   // JETODO - ej klar
//   // JETODO create customer
//   let orderId = await DatabaseConnection.getInstance().saveOrder(
//     request.body.lineItems,
//     request.body.email
//   );
//   response.json({ id: orderId });
// });

async function createOrderAndCustomer(lineItems, customerInfo) {
  let customerId = await DatabaseConnection.getInstance().getOrCreateCustomer(
    customerInfo.email,
    customerInfo.firstName,
    customerInfo.lastName,
    customerInfo.address
  );

  let orderId = await DatabaseConnection.getInstance().saveOrder(
    lineItems,
    customerId
  );

  return { orderId, customerId };
}


app.post("/create-new-order", async (request, response) => {
  try {
    let { orderId } = await createOrderAndCustomer(
      request.body.lineItems,
      request.body.customer
    );
    console.log(request.body.customer)
    response.json({ id: orderId });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.post("/create-customer", async (request, response) => {
 
  let customerId = await DatabaseConnection.getInstance().getOrCreateCustomer(
    request.body.email,
    request.body.firstName,
    request.body.lastName,
    request.body.address
  );

  response.json({ id: customerId });
});

app.post("/products", async (request, response) => {
  // JETODO - ej klar
  let id = await DatabaseConnection.getInstance().createProduct();
  await DatabaseConnection.getInstance().updateProduct(id, request.body);

  response.json({ id: id });
});

app.post("/products/:id", async (request, response) => {
  // JETODO - ej klar - in future: check if user is allowed to edit
  await DatabaseConnection.getInstance().updateProduct(
    request.params.id,
    request.body
  );

  response.json({ id: request.params.id });
});

app.get("/active-products", async (request, response) => {
  let products = await DatabaseConnection.getInstance().getActiveProducts();

  response.json(products);
})

app.post("/complete-order/:id", async (request, response) => {

  //JETODO check that payment has been made - för vg
  let isPaid = true; // JEDEBUG: always true

  if (isPaid) {
    // JETODO mark order as paid
    await DatabaseConnection.getInstance().setOrderAsPaid(request.params.id);
  } else {
// not necessary
  }


  response.json({"paid": isPaid});
})


app.listen(3000);

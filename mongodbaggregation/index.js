console.log("index.js");

let express = require("express");
let DatabaseConnection = require("./src/database/DatabaseConnection");

let url = "mongodb://localhost:27017";

DatabaseConnection.getInstance().setUrl(url);

// DatabaseConnection.getInstance()

// console.log(DatabaseConnection.getInstance());

// DatabaseConnection.getInstance().setUrl(url)

// console.log(DatabaseConnection.getInstance());

let app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/orders", async (request, response) => {
  let orders = await DatabaseConnection.getInstance().getAllOrders();
  response.json(orders);
});

// app.get("/", async (request, response) => {
//   let orders = await DatabaseConnection.getInstance().getAllOrders();
//   response.json(orders);
// });

app.get("/products", async (request, response) => {
  let products = await DatabaseConnection.getInstance().getProducts();

  response.json(products);
});

app.post("/create-new-order", async (request, response) => {
  // JETODO - ej klar
  // JETODO create customer
  let orderId = await DatabaseConnection.getInstance().saveOrder(
    request.body.lineItems,
    request.body.email
  );

  response.json({ id: orderId });
});

app.post("/products", async (request, response) => {
  // JETODO - ej klar
  let id = await DatabaseConnection.getInstance().createProduct();
  await DatabaseConnection.getInstance().updateProduct(id, request.body);

  response.json({ id: id });
});

app.post("/products/:id", async (request, response) => {
  // JETODO - ej klar
  await DatabaseConnection.getInstance().updateProduct(
    request.params.id,
    request.body
  );

  response.json({ id: request.params.id });
});

// app.post("/create-new-order", async (request, response) => { // JETODO - ej klar
//   let customer = await DatabaseConnection.getInstance().getOrCreateCustomer(
//     request.body.email,
//     request.body.name,
//     request.body.address
//   );
//   let order = await DatabaseConnection.getInstance().getOrder(
//     request.lineItems,
//     customer
//   );

//   response.json(order);
// });

// // app.get("/add-product", (request, response) => {
// //     let url = "mongodb://localhost:27017";
// //     let client = new mongodb.MongoClient(url);

// //     client
// //       .connect()
// //       .then(() => {
// //         console.log("Connected");

// //         let db = client.db("webshop");
// //         let collection = db.collection("products");

// //         return collection
// //           .insertMany([
// //             {
// //               artist: "The Beatles",
// //               title: "Sgt. Pepper's Lonely Hearts Club Band",
// //               price: 400,
// //               releaseYear: 1967,
// //             },
// //             {
// //               artist: "Queen",
// //               title: "Killer Queen",
// //               price: 250,
// //               releaseYear: 1976,
// //             },
// //           ])
// //           .then(() => {
// //             console.log("Inserted");
// //             response.json({ message: "Inserted " });
// //           });
// //       })
// //       .finally(() => {
// //         client.close();
// //       });
// // });

// // Här kan du lägga till fler routes om du behöver

app.listen(3000);

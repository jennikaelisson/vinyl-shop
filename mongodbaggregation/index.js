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

app.get("/", async (request, response) => {
  let orders = await DatabaseConnection.getInstance().getAllOrders();
  response.json(orders);
});

app.get("/products", async (request, response) => {
  //JETODO connect to database$
  response.json([{"id": 1, "name": "Product1"}, {"id": 2, "name": "Product2"}, {"id": 3, "name": "Product3"}]);
});

app.post("/create-new-order", async (request, response) => {
  let customer = await DatabaseConnection.getInstance().getOrCreateCustomer(
    request.body.email,
    request.body.name,
    request.body.address
  );
  let order = await DatabaseConnection.getInstance().getOrder(
    request.lineItems,
    customer
  );

  response.json(order);
});

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

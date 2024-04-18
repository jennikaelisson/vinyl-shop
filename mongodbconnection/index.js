console.log("index.js");

let mongodb = require("mongodb");
let express = require("express");

let app = express();

app.get("/create-order", (request, response) => {
  let url = "mongodb://localhost:27017";
  let client = new mongodb.MongoClient(url);

  client
    .connect()
    .then(() => {
      console.log("Connected");

      let db = client.db("webshop");
      let orderCollection = db.collection("orders");
      let customerCollection = db.collection("customers");
      let userCollection = db.collection("users");

      let customer = {
        email: "Jennika@hotmail.com",
        firstName: "Jennika",
        lastName: "Elisson",
        address: "Björkvägen 39",
      };

      customerCollection.insertOne(customer);

      let user = {
        email: "Jennika@hotmail.com",
        password: "123",
      };

      userCollection.insertOne(user);

      return orderCollection
        .insertOne({
          customer: {
            email: customer.email,
            firstName: customer.firstName,
            lastName: customer.lastName,
            address: customer.address,
          },
          totalPrice: 1003,
          orderDate: "2024-04-17",
          paymentId: "j2424",
          status: "In process",
        })
        .then(() => {
          console.log("Order created successfully");
          response.json({ message: "Order created successfully" });
        });
    })
    .catch((error) => {
      console.error("Error creating order:", error);
      response.status(500).json({ error: "Error creating order" });
    })
    .finally(() => {
      client.close();
    });
});

// app.get("/add-product", (request, response) => {

// });

app.listen(3000);

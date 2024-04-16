console.log("index.js");

let mongodb = require("mongodb");
let express = require("express");

let app = express();

app.get("/", (request, response) => {
  let url = "mongodb://localhost:27017";
  let client = new mongodb.MongoClient(url);

  // console.log(client);

  client
    .connect()
    .then(() => {
      console.log("Connected");

      let db = client.db("webshop");
      let collection = db.collection("products");

    //   return collection
    //     .insertMany([
    //       { a: 1 },
    //       {
    //         artist: "Queen",
    //         title: "Killer Queen",
    //         price: 250,
    //         releaseYear: 1976,
    //       },
    //     ])
    //     .then(() => {
    //       console.log("inserted");

          return collection
            .find({ artist: "Kate Bush" })
            .toArray()
            .then((results) => {
              console.log("Found", results);
              response.json(results);
            });
        
    })
    .finally(() => {
      client.close();
    });
 });

app.listen(3000);

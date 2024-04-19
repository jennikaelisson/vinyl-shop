console.log("index.js");

let mongodb = require("mongodb");
let express = require("express");
let DatabaseConnection = require("./src/database/DatabaseConnection")

let url = "mongodb://localhost:27017";

let databaseConnection = new DatabaseConnection(url);

global.databaseConnection = databaseConnection;



// let app = express();

// app.get("/orders", (request, response) => {
//   let url = "mongodb://localhost:27017";
//   let client = new mongodb.MongoClient(url);

//   client
//     .connect()
//     .then(async () => {
//       console.log("Connected");

//       let db = client.db("webshop");
//       let orderCollection = db.collection("orders");

//       let pipeline = [
//         {
//           $lookup: {
//             from: "lineItems",
//             localField: "orderId",
//             foreignField: "id",
//             as: "lineItems",
//             pipeline: [
//               {
//                 $lookup: {
//                   from: "products",
//                   localField: "id",
//                   foreignField: "product",
//                   as: "linkedProduct",
//                 },
//               },
//               {
//                 $addFields: {
//                   linkedProduct: {
//                     $first: "$linkedProduct",
//                   },
//                 },
//               },
//             ],
//           },
//         },
//         {
//           $lookup: {
//             from: "customers",
//             localField: "id",
//             foreignField: "customer",
//             as: "linkedCustomer",
//           },
//         },
//         {
//           $addFields: {
//             linkedCustomer: {
//               $first: "$linkedCustomer",
//             },
//             calculatedTotal: {
//               $sum: "$lineItems.totalPrice",
//             },
//           },
//         },
//       ];

//       let aggregate = orderCollection.aggregate(pipeline);

//       let orders = [];


//       for await (let document of aggregate) {
//         orders.push(document)
//       }

//       return orders;

//     }).then((orders) => {
//       response.json(orders);
//     })
//     .finally(() => {
//       client.close();
//     });
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

// app.listen(3000);

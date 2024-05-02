let instance = null;
let mongodb = require("mongodb");

class DatabaseConnection {
  constructor() {
    console.log("DatabaseConnection::constructor");
    this.client = null;
    this.url = null;

    this.deBugId = Math.floor(Math.random() * 10000000);
  }

  setUrl(url) {
    this.url = url;
  }

  async connect() {
    if (!this.client) {
      this.client = new mongodb.MongoClient(this.url);

      await this.client.connect();
    }
  }

  async saveOrder(lineItems, customerId) {
    await this.connect();
  
    let db = this.client.db("webshop");
    let collection = db.collection("orders");
  
    let result = await collection.insertOne({
      customer: customerId,
      totalPrice: 0,
      orderDate: new Date(),
      paymentId: null,
      status: "unpaid",
    }); // JETODO calcualate totalPrice
  
    let orderId = result.insertedId;
  
    let encodedLineItems = lineItems.map((lineItem) => {
      return {
        quantity: lineItem["quantity"],
        totalPrice: 0, // JETODO calculate
        order: new mongodb.ObjectId(orderId),
        product: new mongodb.ObjectId(lineItem["product"]),
      };
    });
  
    let lineItemsCollection = db.collection("lineItems");
    await lineItemsCollection.insertMany(encodedLineItems);
  
    return orderId;
  }
  
  // Uppdaterad getOrCreateCustomer-funktion för att skapa eller hämta en kund
  async getOrCreateCustomer(email, firstName, lastName, address) {
    await this.connect();
  
    let db = this.client.db("webshop");
    let collection = db.collection("customers");
  
    let existingCustomer = await collection.findOne({ "_id": email });
  
    if (existingCustomer) {
      return existingCustomer._id;
    } else {
      let result = await collection.insertOne({
        "_id": email,
        "firstName": firstName,
        "lastName": lastName,
        "address": {
          "street": address.street,
          "city": address.city
        }
      }); 
  
      return result.insertedId;
    }
  }
  



  
// TOTAL PRICE???
//   async saveOrder(lineItems, customer) {
//     await this.connect();

//     let db = this.client.db("webshop");
//     let collection = db.collection("orders");

//     // Beräkna totalpriset för ordern
//     let totalPrice = 0;
//     for (let i = 0; i < lineItems.length; i++) {
//         let quantity = lineItems[i].quantity;
//         let price = lineItems[i].price;

//         console.log("Quantity:", quantity);
//         console.log("Price:", price);

//         totalPrice += quantity * price;
//     }

//     console.log("TotalPrice:", totalPrice);

//     let result = await collection.insertOne({
//       customer: customer,
//       totalPrice: totalPrice,
//       orderDate: new Date(),
//       paymentId: null,
//       status: "unpaid",
//     });

//     let orderId = result.insertedId;

//     let encodedLineItems = lineItems.map((lineItem) => {
//       return {
//         quantity: lineItem.quantity,
//         totalPrice: lineItem.quantity * lineItem.price,
//         order: new mongodb.ObjectId(orderId),
//         product: new mongodb.ObjectId(lineItem.product),
//       };
//     });

//     let lineItemsCollection = db.collection("lineItems");
//     await lineItemsCollection.insertMany(encodedLineItems);

//     return result.insertedId;
// }



  async createProduct() {
    await this.connect();

    let db = this.client.db("webshop");
    let collection = db.collection("products");

    let result = await collection.insertOne({
      status: "draft",
      artist: null,
      title: null,
      price: null,
      releaseYear: null,
      image: null,
      quantityInStock: null,
      category: null,
    });

    return result.insertedId;
  }

  async updateProduct(id, productData) {
    await this.connect();

    let db = this.client.db("webshop");
    let collection = db.collection("products");

    await collection.updateOne(
      { _id: new mongodb.ObjectId(id) },
      { "$set": 
        { "artist": productData["artist"] , 
         "title": productData["title"] , 
         "price": productData["price"] , 
         "releaseYear": productData["releaseYear"] , 
         "image": productData["image"] ,         
         "quantityInStock": productData["quantityInStock"] , 
         "status": productData["status"] , 
         "category": productData["category"]  ? new mongodb.ObjectId(productData["cateogry"]) : null}, 
    }
    );
  }

  async getProducts() {
    await this.connect();

    let db = this.client.db("webshop");
    let collection = db.collection("products");

    let pipeline = [
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $addFields: {
            category: {
              $first: "$category",
            },
          },
        },
      ];

    let documents = collection.aggregate(pipeline);
    let returnArray = [];

    for await(let document of documents) {
        returnArray.push(document)
    }

    return returnArray;
  }

  async getAllOrders() {
    await this.connect();

    let db = this.client.db("webshop");
    let collection = db.collection("orders");

    let pipeline = [
        {
          $lookup: {
            from: "lineItems",
            localField: "_id",
            foreignField: "order",
            as: "lineItems",
            pipeline: [
              {
                $lookup: {
                  from: "products",
                  localField: "product",
                  foreignField: "_id",
                  as: "product",
                },
              },
              {
                $addFields: {
                  product: {
                    $first: "$product",
                  },
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $addFields: {
            customer: {
              $first: "$customer",
            },
          },
        },
      ];

    let documents = collection.aggregate(pipeline);
    let returnArray = [];

    for await(let document of documents) {
        returnArray.push(document)
    }

    return returnArray;
  }

  async getActiveProducts() {
    await this.connect();

    let db = this.client.db("webshop");
    let collection = db.collection("products");

    let products = await collection.find({"status": "Active"}).toArray();

    return products;
  }

async setOrderAsPaid(id) {
  await this.connect();

  let db = this.client.db("webshop");
  let collection = db.collection("orders");

  await collection.updateOne({"_id": new mongodb.ObjectId(id)}, {$set : {"status": "paid"}})
}


async getOrder(lineItems, customer) {
    // JETOTO

    return { id: "order36476586" };
  }

  // singleton
  static getInstance() {
    if (instance === null) {
      instance = new DatabaseConnection();
    }
    return instance;
  }
}

module.exports = DatabaseConnection;

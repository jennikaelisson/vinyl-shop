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

  async saveOrder(lineItems, customer) {
    await this.connect();

    let db = this.client.db("webshop");
    let collection = db.collection("orders");

    let result = await collection.insertOne({
      customer: customer,
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

    return result.insertedId;
  }

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

  async getAllOrders() {
    await this.connect();

    let db = this.client.db("webshop");
    let orderCollection = db.collection("orders");

    let pipeline = [
      {
        $lookup: {
          from: "lineItems",
          localField: "orderId",
          foreignField: "id",
          as: "lineItems",
          pipeline: [
            {
              $lookup: {
                from: "products",
                localField: "id",
                foreignField: "product",
                as: "linkedProduct",
              },
            },
            {
              $addFields: {
                linkedProduct: {
                  $first: "$linkedProduct",
                },
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "id",
          foreignField: "customer",
          as: "linkedCustomer",
        },
      },
      {
        $addFields: {
          linkedCustomer: {
            $first: "$linkedCustomer",
          },
          calculatedTotal: {
            $sum: "$lineItems.totalPrice",
          },
        },
      },
    ];

    let aggregate = orderCollection.aggregate(pipeline);

    let orders = [];

    for await (let document of aggregate) {
      orders.push(document);
    }

    return orders;
  }

  async getOrCreateCustomer(email, name, address) {
    //JETODO

    return { id: 24442 };
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

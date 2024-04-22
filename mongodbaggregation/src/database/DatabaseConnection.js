let instance = null;
let mongodb = require("mongodb");


class DatabaseConnection {
  constructor() {
    console.log("DatabaseConnection::constructor");
    this.client = null;
    this.url = null;

    this.deBugId = Math.floor(Math.random()*10000000)
  }

  setUrl(url) {
    this.url = url;
  }

  async connect() {
    if (!this.client) {
    this.client = new mongodb.MongoClient(this.url);

    await this.client.connect()}
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
            orders.push(document)
          }
    
          return orders;
  }

  async getOrCreateCustomer(email, name, address) {
    //JETODO

    return {"id": 24442}
  }

async getOrder(lineItems, customer) {
    // JETOTO

    return {"id": "order36476586"}

}

  static getInstance() {
    if (instance === null) {
        instance = new DatabaseConnection();
    } 
    return instance;
  }
}

module.exports = DatabaseConnection;

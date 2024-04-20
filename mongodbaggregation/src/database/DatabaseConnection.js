let instance = null;


class DatabaseConnection {
  constructor() {
    console.log("DatabaseConnection::constructor");
    this.url = null;

    this.deBugId = Math.floor(Math.random()*10000000)
  }

  setUrl(url) {
    this.url = url;
  }

  static getInstance() {
    if (instance === null) {
        instance = new DatabaseConnection();
    } 
    return instance;
  }
}

module.exports = DatabaseConnection;

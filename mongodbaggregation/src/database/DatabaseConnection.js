class DatabaseConnection {
  constructor(url) {
    console.log("DatabaseConnection::constructor");

    this.url = url;
  }

  toString() {
    return "DatabaseConnection";
  }
}

module.exports = DatabaseConnection;

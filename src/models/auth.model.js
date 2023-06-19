const { v4: uuid } = require("uuid");

class contact {
  constructor(name, phoneNumber, email, message) {
    this.id = uuid();
    this.date = new Date();
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.message = message;
  }
}

module.exports = contact;

const Io = require('../utils/Io');
const Contacts = new Io("./database/contacts.json");
const Contact = require("../models/auth.model");
const Users = new Io("./database/users.json");
const socket = require("socket.io")
const userValidation = require("../validations/auth.validation")
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");


const auth = (req, res)=> {
    res.render('auth')
}

const contact = async (req, res)=> {
    const {name, phoneNumber, email, message} = req.body;
    const contacts = await Contacts.read();
    const newContact = new Contact(name, phoneNumber, email, message);

    const data = contacts.length? [...contacts, newContact] :[newContact];

    await Contacts.write(data);
    res.redirect("/contact");
}
const login = async (req, res) => {
    const {username, password} = req.body;
  
    const error = userValidation({username, password});
    if (error) return res.status(400).json({message: error});
  
    const users = await Users.read();
  
    const findUser = users.find((user) => user.username === username);
  
    if (!findUser) {
      return res.redirect("/login");
    }
  
    const checkPass = await bcrypt.compare(password, findUser.password);
  
    if (!checkPass) {
      return res.redirect("/login");
    }
  
    const token = jwt.sign({userId: findUser.id});
  
    res.cookie("token", token);
  
    res.redirect("/admin");
  };
  
  const loginGet = async (req, res) => {
    res.render("login");
  };
  

module.exports = {
    auth,
    contact,
    loginGet,
    login
}
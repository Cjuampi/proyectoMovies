require("dotenv").config();
const jwt = require("jsonwebtoken");
const Movies = require("../models/schemas");
let bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const logica = {
  cryptoW: (word) => {
    return bcrypt.hashSync(word, salt);
  },
  decoToken: (token) => {
    const payload = jwt.decode(token, process.env.SECRET)
    return payload.admin
  },
  generateToken: (email, admin) => {
    let tkn = jwt.sign({ email: email, admin: admin }, process.env.SECRET, {
      expiresIn: "10h",
    });
    return tkn;
  },
  loadlLocalMovies: async () => {
    let resultM = await Movies.find();
    return resultM;
  },
  findOneLocalMovies: async (id) => {
    let resultOne = await Movies.find({ IdMovie: `${id}` });
    return resultOne;
  },
};

module.exports = logica;
